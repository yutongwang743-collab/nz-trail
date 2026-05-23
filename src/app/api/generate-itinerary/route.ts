import { NextRequest, NextResponse } from 'next/server'
import { getLocationImage } from '@/lib/nz-images'

const SYSTEM_PROMPT = `You are a New Zealand travel planning expert. Generate detailed, realistic travel itineraries.

CRITICAL KNOWLEDGE:
- Summer = Dec-Feb, Autumn = Mar-May, Winter = Jun-Aug, Spring = Sep-Nov
- Driving distances: Auckland→Rotorua 3h, Queenstown→Milford Sound 4h, Christchurch→Queenstown 6h, Wellington→Taupo 4.5h
- Keep daily driving under 4 hours. Plan sensible geographic progression.
- Use real place names, realistic NZD prices, practical transport options.

Output ONLY valid JSON (no markdown, no explanation) matching this schema:

{
  "title": "string",
  "description": "2-3 sentence overview",
  "region": "南岛" | "北岛" | "跨岛",
  "bestSeason": ["summer","autumn","winter","spring" (pick 1-2)],
  "typeTags": ["pick from: 自驾公路,极限运动,自然徒步,冰川湖泊,滑雪,霍比屯人文"],
  "variants": [{
    "duration": "string e.g. 3-5天",
    "budgetLevel": "穷游" | "舒适" | "奢华",
    "totalBudgetMin": "number (NZD, total for group)",
    "totalBudgetMax": "number (NZD, total for group)",
    "days": [{
      "day": 1,
      "locations": [{"name": "Queenstown", "lat": -45.0312, "lng": 168.6626}],
      "activities": ["activity"],
      "transport": "string",
      "meals": "string e.g. 早餐:$15 咖啡, 午餐:$25 寿司, 晚餐:$45 牛排",
      "accommodation": "string e.g. YHA Hostel ($45/人)",
      "morningNote": "1 sentence morning tip in Chinese",
      "afternoonNote": "1 sentence afternoon highlight in Chinese",
      "eveningNote": "1 sentence evening suggestion in Chinese",
      "weatherTip": "1 sentence seasonal weather reminder in Chinese",
      "photoSpots": [{"name": "photo spot name", "tip": "best time/angle tip"}],
      "restaurants": [{"name": "restaurant name", "dish": "signature dish", "price": "$20-30 NZD", "tip": "what to order"}],
      "costBreakdown": { "住宿": 0, "交通": 0, "餐饮": 0, "门票": 0, "活动": 0 }
    }]
  }]
}

IMPORTANT:
- locations must be objects with name, lat, lng (NOT strings). Use accurate coordinates.
- photoSpots: 1-2 good photo locations per day
- restaurants: 1-2 real restaurants per day with realistic prices
- day count MUST match user's duration (3-5天=4 days, 7-10天=7 days, 10-14天=10 days)
- Budget: 穷游=$30-80/人/天 accommodation, 舒适=$120-200/人/天, 奢华=$300+/人/天
- costBreakdown values are per-person NZD for that day
- All notes and descriptions in Chinese (Simplified)`

// Fallback geocoding for common NZ locations
const NZ_GEOCODE: Record<string, { lat: number; lng: number }> = {
  'auckland': { lat: -36.8485, lng: 174.7633 },
  'rotorua': { lat: -38.1368, lng: 176.2497 },
  'wellington': { lat: -41.2865, lng: 174.7762 },
  'taupo': { lat: -38.6857, lng: 176.0702 },
  'christchurch': { lat: -43.5321, lng: 172.6362 },
  'queenstown': { lat: -45.0312, lng: 168.6626 },
  'wanaka': { lat: -44.6967, lng: 169.1315 },
  'milford sound': { lat: -44.6396, lng: 167.8968 },
  'te anau': { lat: -45.4147, lng: 167.7167 },
  'glenorchy': { lat: -44.8500, lng: 168.3833 },
  'mount cook': { lat: -43.7333, lng: 170.1000 },
  'lake tekapo': { lat: -44.0047, lng: 170.4771 },
  'dunedin': { lat: -45.8788, lng: 170.5028 },
  'nelson': { lat: -41.2706, lng: 173.2840 },
  'kaikoura': { lat: -42.4000, lng: 173.6814 },
  'fox glacier': { lat: -43.4645, lng: 170.0176 },
  'franz josef': { lat: -43.3871, lng: 170.1825 },
  'hobbiton': { lat: -37.8583, lng: 175.6794 },
  'napier': { lat: -39.4928, lng: 176.9120 },
  'bay of islands': { lat: -35.1833, lng: 174.1667 },
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, '')
}

function resolveLocation(loc: any) {
  if (typeof loc === 'object' && loc !== null && loc.name) {
    const fallback = NZ_GEOCODE[slugify(loc.name)] || {}
    return {
      name: loc.name,
      slug: slugify(loc.name),
      coordinates: [loc.lng || fallback.lng || 0, loc.lat || fallback.lat || 0] as [number, number],
      image: getLocationImage(loc.name).url,
      description: loc.name,
    }
  }
  // legacy string format
  const name = String(loc)
  const fb = NZ_GEOCODE[slugify(name)] || {}
  return {
    name,
    slug: slugify(name),
    coordinates: [fb.lng || 172.6, fb.lat || -43.5] as [number, number],
    image: getLocationImage(name).url,
    description: name,
  }
}

function transformResult(raw: any) {
  const destinations: any[] = []
  const seen = new Set<string>()

  const variants = (raw.variants || []).map((v: any) => ({
    ...v,
    days: (v.days || []).map((d: any, i: number) => {
      const resolvedLocs = (d.locations || []).map((l: any) => {
        const dest = resolveLocation(l)
        if (!seen.has(dest.slug)) {
          seen.add(dest.slug)
          destinations.push(dest)
        }
        return dest.name
      })
      return {
        ...d,
        locations: resolvedLocs,
        day: d.day || i + 1,
      }
    }),
  }))

  return { ...raw, variants, destinations }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'DEEPSEEK_API_KEY not configured' }, { status: 500 })
  }

  const body = await req.json()
  const { travelers, duration, budget, interests, season, freeInput } = body

  const seasonNames: Record<string, string> = {
    summer: '夏季(12-2月)', autumn: '秋季(3-5月)', winter: '冬季(6-8月)', spring: '春季(9-11月)',
  }

  const userPrompt = `请为以下旅行者规划一条新西兰路线：

- 人数：${travelers || '未指定'}
- 天数：${duration || '未指定'}
- 预算档位：${budget || '未指定'}
- 兴趣偏好：${interests?.length ? interests.join('、') : '未指定'}
- 出行季节：${seasonNames[season] || season || '未指定'}
${freeInput ? `- 额外要求：${freeInput}` : ''}

请生成完整的行程JSON。`

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
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('DeepSeek API error:', data)
      return NextResponse.json({ error: data.error?.message || 'API request failed' }, { status: 500 })
    }

    const text = data.choices[0].message.content.trim()
    let json = text
    if (json.startsWith('```')) {
      json = json.split('\n').slice(1).join('\n')
      if (json.endsWith('```')) json = json.slice(0, -3)
    }
    const itinerary = transformResult(JSON.parse(json))
    return NextResponse.json(itinerary)
  } catch (err: any) {
    console.error('AI generation failed:', err)
    return NextResponse.json({ error: err.message || 'Generation failed' }, { status: 500 })
  }
}
