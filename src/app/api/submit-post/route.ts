import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 尝试抓取链接内容（标题 + 正文文本），失败返回 null
async function fetchUrlContent(url: string): Promise<{ title: string; content: string } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36',
      },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const html = await res.text()
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
    const title = titleMatch?.[1]?.trim() || ''
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim()
    return { title, content: text.slice(0, 3000) }
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  if (!url?.trim()) {
    return NextResponse.json({ error: '链接为空' }, { status: 400 })
  }

  const cleanUrl = url.trim()
  const fetched = await fetchUrlContent(cleanUrl)
  const title = (fetched?.title || cleanUrl).slice(0, 100)
  const content = fetched?.content || ''

  let aiSummary: any = {
    locations: [], activities: [], duration: 'unknown',
    budget: 'unknown', season: 'unknown', transport: 'unknown', keyTips: [],
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (apiKey && content) {
    try {
      const extractPrompt = `从以下内容中提取旅行信息，返回JSON：${JSON.stringify({
        locations: ['地点列表'], activities: ['活动列表'], duration: '建议时长',
        budget: '预算范围', season: '适合季节', transport: '交通方式', keyTips: ['关键提示'],
      })}。只返回JSON，不要其他内容。`
      const aiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: extractPrompt },
            { role: 'user', content: `标题: ${title}\n内容: ${content}` },
          ],
          temperature: 0.3,
          max_tokens: 512,
        }),
      })
      const aiData = await aiRes.json()
      if (aiRes.ok) {
        const text = aiData.choices[0].message.content.trim()
        aiSummary = JSON.parse(text.replace(/```json|```/g, '').trim())
      }
    } catch (e) {
      console.error('submit-post AI 提取失败:', e)
    }
  }

  const post = await prisma.post.create({
    data: {
      sourcePlatform: '用户投稿',
      sourceUrl: cleanUrl,
      authorName: '我',
      authorAvatar: '',
      title,
      rawContent: content || cleanUrl,
      aiSummary: JSON.stringify(aiSummary),
      screenshots: '[]',
      likes: 0,
      saves: 0,
      comments: 0,
      status: 'auto_published',
      sourcePublishedAt: new Date(),
    },
  })

  return NextResponse.json({ ok: true, post: { id: post.id, title: post.title }, fetched: !!fetched })
}
