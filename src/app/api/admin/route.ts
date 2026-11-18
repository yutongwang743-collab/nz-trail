import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme'

export async function POST(req: NextRequest) {
  const body = await req.json()

  switch (body.action) {
    case 'login': {
      if (body.password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ ok: true })
        response.cookies.set('admin_token', ADMIN_PASSWORD, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24,
        })
        return response
      }
      return NextResponse.json({ ok: false, error: 'Wrong password' }, { status: 401 })
    }

    case 'verify': {
      const token = req.cookies.get('admin_token')?.value
      return NextResponse.json({ ok: token === ADMIN_PASSWORD })
    }

    case 'list_posts': {
      const token = req.cookies.get('admin_token')?.value
      if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const posts = await prisma.post.findMany({
        orderBy: { crawledAt: 'desc' },
        take: 50,
        include: { route: { select: { title: true } } },
      })
      return NextResponse.json({ posts })
    }

    case 'update_post': {
      const token = req.cookies.get('admin_token')?.value
      if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const { id, status, routeId } = body
      await prisma.post.update({
        where: { id },
        data: {
          ...(status ? { status } : {}),
          ...(routeId !== undefined ? { routeId } : {}),
        },
      })
      return NextResponse.json({ ok: true })
    }

    case 'update_route': {
      const token = req.cookies.get('admin_token')?.value
      if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const { id, description, featuredOrder } = body
      await prisma.route.update({
        where: { id },
        data: {
          ...(description !== undefined ? { description } : {}),
          ...(featuredOrder !== undefined ? { featuredOrder } : {}),
        },
      })
      return NextResponse.json({ ok: true })
    }

    case 'batch_import': {
      const token = req.cookies.get('admin_token')?.value
      if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const { rawText } = body
      if (!rawText) return NextResponse.json({ error: 'No content' }, { status: 400 })

      const blocks = rawText.split(/^---$/m).map((b: string) => b.trim()).filter(Boolean)
      const apiKey = process.env.DEEPSEEK_API_KEY
      if (!apiKey) return NextResponse.json({ error: 'DEEPSEEK_API_KEY not configured' }, { status: 500 })

      let imported = 0
      for (const block of blocks) {
        try {
          // Parse block: optional URL line, title line, then content
          const lines: string[] = block.split('\n').map((l: string) => l.trim()).filter(Boolean)
          if (lines.length < 2) continue

          let sourceUrl = ''
          let title = ''
          let contentStart = 0

          if (lines[0].startsWith('http')) {
            sourceUrl = lines[0]
            title = lines[1] || '未命名'
            contentStart = 2
          } else {
            title = lines[0]
            contentStart = 1
          }
          const rawContent = lines.slice(contentStart).join('\n').slice(0, 3000)

          // Call DeepSeek to extract structured data
          const extractPrompt = `从以下帖子内容中提取旅行信息（国家/地点、活动、时长、预算、季节、交通、关键提示），返回JSON：

${JSON.stringify({
  locations: ['地点列表'],
  activities: ['活动列表'],
  duration: '建议时长',
  budget: '预算范围',
  season: '适合季节',
  transport: '交通方式',
  keyTips: ['关键提示'],
})}

只返回JSON，不要其他内容。`

          const aiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [
                { role: 'system', content: extractPrompt },
                { role: 'user', content: `标题: ${title}\n内容: ${rawContent}` },
              ],
              temperature: 0.3,
              max_tokens: 512,
            }),
          })
          const aiData = await aiRes.json()
          let aiSummary: any = {}
          try {
            const text = aiData.choices[0].message.content.trim()
            aiSummary = JSON.parse(text.replace(/```json|```/g, '').trim())
          } catch { continue }

          await prisma.post.create({
            data: {
              sourcePlatform: '小红书',
              sourceUrl: sourceUrl || 'https://www.xiaohongshu.com',
              authorName: '用户导入',
              authorAvatar: '',
              title,
              rawContent,
              aiSummary: JSON.stringify(aiSummary),
              screenshots: '[]',
              likes: 0,
              saves: 0,
              comments: 0,
              status: 'auto_published',
              sourcePublishedAt: new Date(),
            },
          })
          imported++
        } catch (e) {
          console.error('Import error for block:', e)
        }
      }

      return NextResponse.json({ ok: true, imported })
    }

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  }
}
