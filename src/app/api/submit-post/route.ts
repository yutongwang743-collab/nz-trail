import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 用户投稿：把自己读到的喜欢的帖子存进来，AI 提取要点并融入知识库/推荐
export async function POST(req: NextRequest) {
  const { sourceUrl, title, content } = await req.json()
  if (!content?.trim() && !title?.trim()) {
    return NextResponse.json({ error: '内容为空' }, { status: 400 })
  }

  let aiSummary: any = {
    locations: [], activities: [], duration: 'unknown',
    budget: 'unknown', season: 'unknown', transport: 'unknown', keyTips: [],
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (apiKey) {
    try {
      const extractPrompt = `从以下帖子内容中提取旅行信息，返回JSON：${JSON.stringify({
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
      sourceUrl: sourceUrl || `user-submit-${Date.now()}`,
      authorName: '我',
      authorAvatar: '',
      title: title?.trim() || content.trim().slice(0, 30),
      rawContent: content.trim().slice(0, 3000),
      aiSummary: JSON.stringify(aiSummary),
      screenshots: '[]',
      likes: 0,
      saves: 0,
      comments: 0,
      status: 'auto_published',
      sourcePublishedAt: new Date(),
    },
  })

  return NextResponse.json({ ok: true, post: { id: post.id, title: post.title } })
}
