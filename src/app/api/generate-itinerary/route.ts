import { NextRequest, NextResponse } from 'next/server'
import { PLAN_TYPES, buildSystemPrompt, transformPlan } from '@/lib/aiGenerate'

const seasonNames: Record<string, string> = {
  summer: '夏季(12-2月)', autumn: '秋季(3-5月)', winter: '冬季(6-8月)', spring: '春季(9-11月)',
}

async function callDeepSeek(apiKey: string, systemPrompt: string, userPrompt: string): Promise<any | null> {
  try {
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('DeepSeek API error:', data)
      return null
    }

    let text: string = data.choices[0].message.content.trim()
    if (text.startsWith('```')) {
      text = text.split('\n').slice(1).join('\n')
      if (text.endsWith('```')) text = text.slice(0, -3)
    }
    return transformPlan(JSON.parse(text))
  } catch (e: any) {
    console.error('generatePlan failed:', e?.message || e)
    return null
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'DEEPSEEK_API_KEY not configured' }, { status: 500 })
  }

  const body = await req.json()
  const { country, travelers, duration, budget, interests, season, freeInput } = body

  const countryLabel = country || '新西兰'

  const userPrompt = `请为以下旅行者规划一条${countryLabel}路线：

- 国家/地区：${countryLabel}
- 人数：${travelers || '未指定'}
- 天数：${duration || '未指定'}
- 预算档位：${budget || '未指定'}
- 兴趣偏好：${interests?.length ? interests.join('、') : '未指定'}
- 出行季节：${seasonNames[season] || season || '未指定'}
${freeInput ? `- 额外要求：${freeInput}` : ''}

请生成完整的行程JSON。`

  const plans = (
    await Promise.all(
      PLAN_TYPES.map(pt => callDeepSeek(apiKey, buildSystemPrompt(countryLabel, pt), userPrompt))
    )
  ).filter(Boolean)

  if (plans.length === 0) {
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 })
  }
  return NextResponse.json({ plans })
}
