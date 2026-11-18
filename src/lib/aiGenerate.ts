import { getLocationImage } from './location-images'

// ── 三方案类型 ──

export interface PlanType {
  type: string
  name: string
  guidance: string
}

export const PLAN_TYPES: PlanType[] = [
  { type: 'classic', name: '经典环线', guidance: '覆盖最经典、必打卡的景点，适合第一次前往的游客，兼顾自然与人文' },
  { type: 'relaxed', name: '休闲美食', guidance: '行程轻松、节奏舒缓，侧重美食、海岸线、慢旅行与拍照，适合情侣或放松之旅' },
  { type: 'adventure', name: '自然探险', guidance: '侧重自然风光、徒步、野生动物与户外体验，驾驶/徒步强度可略高，适合户外爱好者' },
]

// ── 国家知识 ──

const COUNTRY_KNOWLEDGE: Record<string, string> = {
  '澳大利亚': `- Country: Australia (currency AUD)
- Seasons: Summer = Dec-Feb, Autumn = Mar-May, Winter = Jun-Aug, Spring = Sep-Nov
- Tasmania driving distances: Hobart→Port Arthur 1.5h, Hobart→Launceston 2h, Hobart→Wineglass Bay (Freycinet) 2.5h, Launceston→Cradle Mountain 2h, Hobart→Bruny Island ferry 45min
- Tasmania key spots: MONA museum, Salamanca Market, Bruny Island (oysters/cheese), Port Arthur Historic Site, Wineglass Bay, Bay of Fires, Cradle Mountain (Dove Lake), Cataract Gorge
- Use real Australian/Tasmania place names, realistic AUD prices`,
  '新西兰': `- Country: New Zealand (currency NZD)
- Seasons: Summer = Dec-Feb, Autumn = Mar-May, Winter = Jun-Aug, Spring = Sep-Nov
- Driving distances: Auckland→Rotorua 3h, Queenstown→Milford Sound 4h, Christchurch→Queenstown 6h, Wellington→Taupo 4.5h
- Use real New Zealand place names, realistic NZD prices`,
}

// ── 地理编码 fallback ──

const GEOCODE: Record<string, { lat: number; lng: number }> = {
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
  // Australia / Tasmania (slugified keys)
  'hobart': { lat: -42.8821, lng: 147.3272 },
  'launceston': { lat: -41.4332, lng: 147.1441 },
  'portarthur': { lat: -43.1500, lng: 147.8500 },
  'brunyisland': { lat: -43.3667, lng: 147.2833 },
  'wineglassbay': { lat: -42.1617, lng: 148.3097 },
  'bayoffires': { lat: -41.1270, lng: 148.2700 },
  'cradlemountain': { lat: -41.6840, lng: 145.9500 },
  'sydney': { lat: -33.8688, lng: 151.2093 },
  'melbourne': { lat: -37.8136, lng: 144.9631 },
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, '')
}

function resolveLocation(loc: any) {
  if (typeof loc === 'object' && loc !== null && loc.name) {
    const fallback = GEOCODE[slugify(loc.name)] || {}
    return {
      name: loc.name,
      slug: slugify(loc.name),
      coordinates: [loc.lng || fallback.lng || 0, loc.lat || fallback.lat || 0] as [number, number],
      image: getLocationImage(loc.name).url,
      description: loc.name,
    }
  }
  const name = String(loc)
  const fb = GEOCODE[slugify(name)] || {}
  return {
    name,
    slug: slugify(name),
    coordinates: [fb.lng || 0, fb.lat || 0] as [number, number],
    image: getLocationImage(name).url,
    description: name,
  }
}

// ── 生成单个方案的 System Prompt ──

export function buildSystemPrompt(country: string, planType: PlanType): string {
  const knowledge = COUNTRY_KNOWLEDGE[country] || COUNTRY_KNOWLEDGE['新西兰']
  return `You are a travel planning expert. Generate ONE detailed, realistic itinerary in "${planType.name}" style.

STYLE: ${planType.guidance}

CRITICAL KNOWLEDGE:
${knowledge}
- Keep daily driving under 4 hours. Plan sensible geographic progression.
- Use practical transport options.

Output ONLY valid JSON (no markdown, no explanation) matching this schema:

{
  "type": "${planType.type}",
  "name": "${planType.name}",
  "title": "string",
  "description": "2-3 sentence overview",
  "country": "string (新西兰 or 澳大利亚)",
  "region": "string (state/region, e.g. 南岛/北岛 for 新西兰, 塔斯马尼亚 for 澳大利亚)",
  "bestSeason": ["summer","autumn","winter","spring" (pick 1-2)],
  "typeTags": ["pick from: 自驾公路,极限运动,自然徒步,冰川湖泊,滑雪,美食美酒,野生动物,人文打卡,城市漫步"],
  "highlights": ["3-5 short selling points in Chinese"],
  "duration": "string e.g. 5天",
  "budgetLevel": "穷游" | "舒适" | "奢华",
  "totalBudgetMin": "number (total for group, country currency)",
  "totalBudgetMax": "number (total for group, country currency)",
  "days": [{
    "day": 1,
    "locations": [{"name": "Hobart", "lat": -42.8821, "lng": 147.3272}],
    "activities": ["activity"],
    "transport": "string",
    "meals": "string e.g. 早餐:$15 咖啡, 午餐:$25 寿司, 晚餐:$45 牛排",
    "accommodation": "string e.g. YHA Hostel ($45/人)",
    "morningNote": "1 sentence morning tip in Chinese",
    "afternoonNote": "1 sentence afternoon highlight in Chinese",
    "eveningNote": "1 sentence evening suggestion in Chinese",
    "weatherTip": "1 sentence seasonal weather reminder in Chinese",
    "photoSpots": [{"name": "photo spot name", "tip": "best time/angle tip"}],
    "restaurants": [{"name": "restaurant name", "dish": "signature dish", "price": "$20-30", "tip": "what to order"}],
    "costBreakdown": { "住宿": 0, "交通": 0, "餐饮": 0, "门票": 0, "活动": 0 }
  }]
}

IMPORTANT:
- locations must be objects with name, lat, lng (NOT strings). Use accurate coordinates.
- photoSpots: 1-2 good photo locations per day
- restaurants: 1-2 real restaurants per day with realistic prices
- day count MUST match user's duration (3-5天=4-5 days, 7-10天=7 days, 10-14天=10 days)
- Budget: 穷游=$30-80/人/天 accommodation, 舒适=$120-200/人/天, 奢华=$300+/人/天
- costBreakdown values are per-person for that day (in country currency)
- All notes and descriptions in Chinese (Simplified)`
}

// ── 把 AI 返回的单个方案转换成带 coordinates/destinations 的结构 ──

export function transformPlan(raw: any) {
  const destinations: any[] = []
  const seen = new Set<string>()

  const days = (raw.days || []).map((d: any, i: number) => {
    const resolvedLocs = (d.locations || []).map((l: any) => {
      const dest = resolveLocation(l)
      if (!seen.has(dest.slug)) {
        seen.add(dest.slug)
        destinations.push(dest)
      }
      return dest.name
    })
    return { ...d, locations: resolvedLocs, day: d.day || i + 1 }
  })

  return { ...raw, days, destinations }
}
