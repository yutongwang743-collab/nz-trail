import { NextRequest, NextResponse } from 'next/server'
import { PLAN_TYPES, buildSystemPrompt, transformPlan } from '@/lib/aiGenerate'

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'DEEPSEEK_API_KEY not configured' }, { status: 500 })
  }

  const body = await req.json()
  const { country, plan, instruction } = body
  if (!instruction || !plan) {
    return NextResponse.json({ error: '缺少修改要求或现有行程' }, { status: 400 })
  }

  const planType = PLAN_TYPES.find(p => p.type === plan?.type) || PLAN_TYPES[0]
  const systemPrompt = buildSystemPrompt(country || '新西兰', planType) + `
---
The user wants you to MODIFY the existing itinerary below according to their instruction.
Return the FULL modified itinerary in the SAME JSON schema (do not omit any days or fields).
Only change what the instruction asks; keep everything else unchanged.`

  const userPrompt = `修改要求：${instruction}

现有行程 JSON：
${JSON.stringify(plan)}`

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
        temperature: 0.5,
        max_tokens: 4096,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('DeepSeek API error:', data)
      return NextResponse.json({ error: data.error?.message || 'API request failed' }, { status: 500 })
    }

    let text: string = data.choices[0].message.content.trim()
    if (text.startsWith('```')) {
      text = text.split('\n').slice(1).join('\n')
      if (text.endsWith('```')) text = text.slice(0, -3)
    }
    return NextResponse.json({ plan: transformPlan(JSON.parse(text)) })
  } catch (err: any) {
    console.error('modify failed:', err)
    return NextResponse.json({ error: err.message || '修改失败' }, { status: 500 })
  }
}
