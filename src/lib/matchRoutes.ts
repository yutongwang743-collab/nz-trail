import type { RouteWithVariants, WizardAnswers, MatchResult } from './types'

export type { MatchResult }

// ── Interest → typeTags mapping ──

const INTEREST_TAG_MAP: Record<string, string[]> = {
  '自然风光': ['自然徒步', '冰川湖泊'],
  '极限运动': ['极限运动', '滑雪'],
  '人文打卡': ['霍比屯人文', '自驾公路'],
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

      // Interest
      if (answers.interest) {
        const targetTags = INTEREST_TAG_MAP[answers.interest]
        if (route.typeTags.some(t => targetTags.includes(t))) {
          score++
          tags.push('兴趣匹配')
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
  if (answers.interest) count++
  if (answers.season) count++
  return count
}
