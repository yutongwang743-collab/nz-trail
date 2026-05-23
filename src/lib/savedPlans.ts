'use client'

const STORAGE_KEY = 'nz-trail-saved-plans'

export interface SavedPlan {
  id: string
  type: 'route' | 'ai'
  title: string
  description: string
  region: string
  savedAt: string
  // type='route'
  routeId?: number
  routeSlug?: string
  variantDuration?: string
  variantBudget?: string
  // type='ai'
  aiData?: any
}

export function getSavedPlans(): SavedPlan[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function savePlan(plan: SavedPlan): void {
  if (typeof window === 'undefined') return
  const plans = getSavedPlans().filter(p => p.id !== plan.id)
  plans.unshift(plan)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
}

export function removePlan(id: string): void {
  if (typeof window === 'undefined') return
  const plans = getSavedPlans().filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
}

export function isPlanSaved(id: string): boolean {
  return getSavedPlans().some(p => p.id === id)
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
