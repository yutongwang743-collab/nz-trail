'use client'

const STORAGE_KEY = 'nz-trail-ai-history'

export interface AIHistoryEntry {
  id: string
  title: string
  description: string
  region: string
  createdAt: string
  aiData: any
}

export function getAIHistory(): AIHistoryEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function addAIHistory(entry: AIHistoryEntry): void {
  if (typeof window === 'undefined') return
  const history = getAIHistory()
  // Remove duplicate by title
  const filtered = history.filter(h => h.title !== entry.title)
  filtered.unshift(entry)
  // Keep max 20 entries
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 20)))
}

export function removeAIHistory(id: string): void {
  if (typeof window === 'undefined') return
  const history = getAIHistory().filter(h => h.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}
