import type { RouteWithVariants, WizardAnswers, MatchResult } from './types'

export type { MatchResult }

// ── Interest → typeTags mapping ──

const INTEREST_TAG_MAP: Record<string, string[]> = {
  '自然徒步': ['自然徒步'],
  '冰川湖泊': ['冰川湖泊'],
  '极限运动': ['极限运动'],
  '滑雪': ['滑雪'],
  '自驾公路': ['自驾公路'],
  '霍比屯人文': ['霍比屯人文'],
  '温泉养生': ['自然徒步', '冰川湖泊'], // relax/nature adjacent
  '美食美酒': ['自驾公路', '霍比屯人文'],
  '野生动物': ['自然徒步', '冰川湖泊'],
  '摄影打卡': ['自然徒步', '冰川湖泊', '霍比屯人文'],
  '星空观测': ['自然徒步', '冰川湖泊'],
  '城市漫步': ['霍比屯人文', '自驾公路'],
}

// ── Traveler count → divisor ──

const TRAVELER_DIVISOR: Record<string, number> = {
  '1': 1,
  '2': 2,
  '3-4': 3.5,
  '5+': 5,
}

// ── Matching function ──

export function matchRoutes(routes: RouteWithVariants[], answers: WizardAnswers): MatchResult[] {
  const activeDims = countActiveDimensions(answers)

  return routes
    .map(route => {
      let score = 0
      const tags: string[] = []

      // Duration
      if (answers.duration) {
        if (route.variants.some(v => v.duration === answers.duration)) {
          score++
          tags.push('天数匹配')
        }
      }

      // Budget
      if (answers.budget) {
        if (route.variants.some(v => v.budgetLevel === answers.budget)) {
          score++
          tags.push('预算匹配')
        }
      }

      // Interests (multi-select)
      if (answers.interests && answers.interests.length > 0) {
        let interestMatches = 0
        for (const interest of answers.interests) {
          const targetTags = INTEREST_TAG_MAP[interest]
          if (targetTags && route.typeTags.some(t => targetTags.includes(t))) {
            interestMatches++
          }
        }
        if (interestMatches > 0) {
          score += interestMatches
          tags.push(`兴趣匹配(${interestMatches})`)
        }
      }

      // Season
      if (answers.season) {
        if (route.bestSeason.includes(answers.season)) {
          score++
          tags.push('季节匹配')
        }
      }

      // Per-person budget
      let perPersonBudget: { min: number; max: number } | undefined
      if (answers.travelers) {
        const divisor = TRAVELER_DIVISOR[answers.travelers]
        if (divisor) {
          const matchingVariant = route.variants
            .filter(v => !answers.budget || v.budgetLevel === answers.budget)
            .sort((a, b) => a.totalBudgetMin - b.totalBudgetMin)[0]
          if (matchingVariant) {
            perPersonBudget = {
              min: Math.round(matchingVariant.totalBudgetMin / divisor),
              max: Math.round(matchingVariant.totalBudgetMax / divisor),
            }
          }
        }
      }

      return { route, score, maxScore: activeDims, tags, perPersonBudget }
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return (a.route.featuredOrder ?? 99) - (b.route.featuredOrder ?? 99)
    })
}

function countActiveDimensions(answers: WizardAnswers): number {
  let count = 0
  if (answers.duration) count++
  if (answers.budget) count++
  if (answers.interests && answers.interests.length > 0) count++
  if (answers.season) count++
  return count
}
