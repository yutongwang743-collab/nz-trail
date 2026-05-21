import type { RouteVariantData } from './types'

export interface DayDiff {
  day: number
  accommodationChanged: boolean
  transportChanged: boolean
  mealsChanged: boolean
  activitiesChanged: boolean
  previousAccommodation: string
  currentAccommodation: string
  previousMeals: string
  currentMeals: string
}

export interface VariantDiff {
  summary: string[]
  days: Map<number, DayDiff>
}

export function diffVariants(prev: RouteVariantData, curr: RouteVariantData): VariantDiff | null {
  if (prev.id === curr.id) return null

  const summary: string[] = []
  const days = new Map<number, DayDiff>()
  const prevItinerary = prev.itinerary
  const currItinerary = curr.itinerary
  const maxDays = Math.max(prevItinerary.length, currItinerary.length)

  let accommodationChanges = 0
  let mealChanges = 0
  let activityChanges = 0

  for (let i = 0; i < maxDays; i++) {
    const prevDay = prevItinerary[i]
    const currDay = currItinerary[i]

    if (!prevDay || !currDay) continue

    const accommodationChanged = prevDay.accommodation !== currDay.accommodation
    const mealsChanged = prevDay.meals !== currDay.meals
    const transportChanged = prevDay.transport !== currDay.transport
    const activitiesChanged = prevDay.activities.join(',') !== currDay.activities.join(',')

    if (accommodationChanged) accommodationChanges++
    if (mealsChanged) mealChanges++
    if (activitiesChanged) activityChanges++

    days.set(prevDay.day, {
      day: prevDay.day,
      accommodationChanged,
      transportChanged,
      mealsChanged,
      activitiesChanged,
      previousAccommodation: prevDay.accommodation,
      currentAccommodation: currDay.accommodation,
      previousMeals: prevDay.meals,
      currentMeals: currDay.meals,
    })
  }

  if (accommodationChanges > 0) summary.push(`住宿：${accommodationChanges}天有变化`)
  if (activityChanges > 0) summary.push(`活动：${activityChanges}天有调整`)
  if (mealChanges > 0) summary.push(`餐饮：${mealChanges}天不同`)
  if (prev.budgetLevel !== curr.budgetLevel) summary.push(`预算：${prev.budgetLevel} → ${curr.budgetLevel}`)

  return { summary, days }
}
