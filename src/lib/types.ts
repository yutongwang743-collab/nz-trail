export interface CostBreakdown {
  住宿: number
  交通: number
  餐饮: number
  门票: number
  活动: number
}

export interface ItineraryDay {
  day: number
  locations: string[]
  activities: string[]
  transport: string
  meals: string
  accommodation: string
  costBreakdown: CostBreakdown
  morningNote?: string
  afternoonNote?: string
  eveningNote?: string
  weatherTip?: string
  highlightDesc?: string
  highlightQuote?: { text: string; author: string }
  coverImage?: string
  photoSpots?: { name: string; tip: string; image: string }[]
  restaurants?: { name: string; dish: string; price: string; tip: string; image: string }[]
}

export interface RouteVariantData {
  id: number
  routeId: number
  duration: string
  budgetLevel: string
  itinerary: ItineraryDay[]
  totalBudgetMin: number
  totalBudgetMax: number
}

export interface RouteWithVariants {
  id: number
  title: string
  slug: string
  region: string
  coverImage: string
  description: string
  bestSeason: string[]
  typeTags: string[]
  featuredOrder: number | null
  destinations: {
    dayIndex: number
    destination: {
      id: number
      name: string
      slug: string
      region: string
      coordinates: string
      coverImage: string
      type: string
    }
  }[]
  variants: RouteVariantData[]
}

export interface PostData {
  id: number
  sourcePlatform: string
  sourceUrl: string
  authorName: string
  authorAvatar: string
  title: string
  rawContent: string
  aiSummary: {
    locations: string[]
    activities: string[]
    duration: string
    budget: string
    season: string
    transport: string
    keyTips: string[]
  }
  screenshots: string[]
  likes: number
  saves: number
  comments: number
  status: string
  sourcePublishedAt: string
}

export type TravelStyle = '徒步' | '慢旅行' | '公路自驾' | '穷游' | '冒险' | '人文打卡'

export type FilterState = {
  style: TravelStyle | null
  duration: '3-5天' | '7-10天' | '10-14天' | null
}

export const DURATION_OPTIONS = ['3-5天', '7-10天', '10-14天'] as const

export const BUDGET_LABELS: Record<string, { label: string; color: string }> = {
  '穷游': { label: '💰 穷游', color: 'bg-green-100 text-green-800' },
  '舒适': { label: '💰💰 舒适', color: 'bg-blue-100 text-blue-800' },
  '奢华': { label: '💰💰💰 奢华', color: 'bg-purple-100 text-purple-800' },
}

export function parseRouteJSON<T>(field: string | string[]): T {
  if (typeof field === 'string') return JSON.parse(field)
  if (Array.isArray(field)) return field.map(f => typeof f === 'string' ? JSON.parse(f) : f) as T
  return field as T
}

// ── Discovery wizard types ──

export interface WizardAnswers {
  travelers?: '1' | '2' | '3-4' | '5+'
  duration?: '3-5天' | '7-10天' | '10-14天'
  budget?: '穷游' | '舒适' | '奢华'
  interests?: string[]
  season?: 'summer' | 'autumn' | 'winter' | 'spring'
}

export interface MatchResult {
  route: RouteWithVariants
  score: number
  maxScore: number
  tags: string[]
  perPersonBudget?: { min: number; max: number }
}

// ── Destination page types ──

export interface PracticalInfo {
  bestSeason: string
  ticketPrice: string
  transport: string
  stayDuration: string
  nearbySpots: { name: string; distance: string; slug: string }[]
  accommodation: string
  xhsTags: string[]
}

export interface DestinationPageData {
  id: number
  name: string
  slug: string
  region: string
  coordinates: string
  coverImage: string
  description: string
  type: string
  practicalInfo: PracticalInfo
  routes: Array<RouteWithVariants & { dayIndex: number }>
  posts: PostData[]
}
