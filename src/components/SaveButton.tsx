'use client'

import { useState, useEffect, useMemo } from 'react'
import { isPlanSaved, savePlan, removePlan, type SavedPlan } from '@/lib/savedPlans'

interface SaveButtonProps {
  plan: Omit<SavedPlan, 'id' | 'savedAt'>
  className?: string
  onToggle?: (saved: boolean) => void
}

function stableId(plan: Omit<SavedPlan, 'id' | 'savedAt'>): string {
  if (plan.type === 'route') return `route-${plan.routeId}`
  return `ai-${plan.title.replace(/[^a-z0-9一-鿿]/gi, '-').slice(0, 50)}`
}

export default function SaveButton({ plan, className = '', onToggle }: SaveButtonProps) {
  const id = useMemo(() => stableId(plan), [plan.type, plan.routeId, plan.title])
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setSaved(isPlanSaved(id))
    setMounted(true)
  }, [id])

  const toggle = () => {
    if (saved) {
      removePlan(id)
      setSaved(false)
      onToggle?.(false)
    } else {
      savePlan({ ...plan, id, savedAt: new Date().toISOString() })
      setSaved(true)
      onToggle?.(true)
    }
  }

  if (!mounted) return <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${className}`} />

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle() }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
        saved
          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
      } ${className}`}
      title={saved ? '取消收藏' : '收藏'}
    >
      {saved ? '❤️' : '🤍'}
      <span className="text-xs">{saved ? '已收藏' : '收藏'}</span>
    </button>
  )
}
