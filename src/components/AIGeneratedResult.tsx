'use client'

import { useState } from 'react'
import MapTimeline from './MapTimeline'
import BudgetBreakdown from './BudgetBreakdown'
import FoodStaySummary from './FoodStaySummary'
import SaveButton from './SaveButton'
import { getLocationImage } from '@/lib/location-images'
import { currencyForCountry } from '@/lib/types'
import { validateItinerary } from '@/lib/validateItinerary'

interface AIDay {
  day: number
  locations: string[]
  activities: string[]
  transport: string
  meals: string
  accommodation: string
  morningNote: string
  afternoonNote: string
  eveningNote: string
  weatherTip: string
  photoSpots?: { name: string; tip: string }[]
  restaurants?: { name: string; dish: string; price: string; tip: string }[]
  costBreakdown: { 住宿: number; 交通: number; 餐饮: number; 门票: number; 活动: number }
}

interface Destination {
  name: string
  slug: string
  coordinates: [number, number]
  image: string
  description: string
}

interface PlanData {
  type: string
  name: string
  title: string
  description: string
  country?: string
  region: string
  bestSeason: string[]
  typeTags: string[]
  highlights?: string[]
  duration: string
  budgetLevel: string
  totalBudgetMin: number
  totalBudgetMax: number
  days: AIDay[]
  destinations: Destination[]
}

interface AIGeneratedData {
  plans: PlanData[]
}

interface Props {
  data: AIGeneratedData
  onClose: () => void
}

const PLAN_ICON: Record<string, string> = {
  classic: '🏛️',
  relaxed: '🍷',
  adventure: '🥾',
}

const REGION_COLOR: Record<string, string> = {
  '南岛': 'bg-emerald-100 text-emerald-800',
  '北岛': 'bg-sky-100 text-sky-800',
  '跨岛': 'bg-purple-100 text-purple-800',
  '塔斯马尼亚': 'bg-amber-100 text-amber-800',
  '昆士兰': 'bg-teal-100 text-teal-800',
  '维多利亚': 'bg-indigo-100 text-indigo-800',
  '新南威尔士': 'bg-rose-100 text-rose-800',
}

export default function AIGeneratedResult({ data, onClose }: Props) {
  const [plans, setPlans] = useState<PlanData[]>(data.plans || [])
  const [selected, setSelected] = useState(0)
  const [modifyInstruction, setModifyInstruction] = useState('')
  const [modifying, setModifying] = useState(false)
  const [modifyError, setModifyError] = useState<string | null>(null)
  const plan = plans[selected]
  if (!plan) return null

  const warnings = validateItinerary(plan.days, plan.destinations || [])

  const itinerary = plan.days.map(day => ({
    ...day,
    photoSpots: (day.photoSpots || []).map(ps => ({ ...ps, image: getLocationImage(ps.name, 320, 240).url })),
    restaurants: (day.restaurants || []).map(r => ({ ...r, image: getLocationImage(r.name, 320, 240).url })),
  }))

  const handleModify = async () => {
    if (!modifyInstruction.trim() || modifying) return
    setModifying(true)
    setModifyError(null)
    try {
      const res = await fetch('/api/modify-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: plan.country, plan, instruction: modifyInstruction }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || '修改失败')
      setPlans(prev => prev.map((p, i) => (i === selected ? json.plan : p)))
      setModifyInstruction('')
    } catch (e: any) {
      setModifyError(e?.message || '修改失败')
    } finally {
      setModifying(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-soft-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="text-white/80 text-xs px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm">
                🤖 AI 生成 · 3 个方案
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${REGION_COLOR[plan.region] || 'bg-gray-100 text-gray-700'}`}>
                {plan.country ? `${plan.country} · ` : ''}{plan.region}
              </span>
              {(plan.typeTags || []).slice(0, 2).map((tag: string) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80 hidden sm:inline">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white leading-tight">{plan.name} · {plan.title}</h2>
            <p className="text-white/65 text-sm mt-1 max-w-lg line-clamp-2">{plan.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <SaveButton
              plan={{
                type: 'ai',
                title: plan.title,
                description: plan.description,
                country: plan.country,
                region: plan.region,
                aiData: data,
              }}
              className="text-white/80 hover:text-white"
            />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Plan selector */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {plans.map((p, i) => (
            <button
              key={p.type}
              onClick={() => setSelected(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                i === selected
                  ? 'bg-white text-gray-900 shadow'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {PLAN_ICON[p.type] || '📍'} {p.name} · {p.duration} · {currencyForCountry(p.country)}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison strip */}
      <div className="px-4 sm:px-6 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {plans.map((p, i) => (
          <button
            key={p.type}
            onClick={() => setSelected(i)}
            className={`p-3 rounded-xl border text-left transition ${
              i === selected ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-semibold text-gray-900">{PLAN_ICON[p.type] || '📍'} {p.name}</div>
            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
              {p.highlights?.slice(0, 2).join(' · ') || p.description}
            </div>
            <div className="text-xs font-medium text-brand-600 mt-1.5">
              {currencyForCountry(p.country)} {p.totalBudgetMin}-{p.totalBudgetMax}
            </div>
          </button>
        ))}
      </div>

      {/* Highlights */}
      {plan.highlights && plan.highlights.length > 0 && (
        <div className="px-4 sm:px-6 pt-4 flex flex-wrap gap-1.5">
          {plan.highlights.map((h, i) => (
            <span key={i} className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded-full">✨ {h}</span>
          ))}
        </div>
      )}

      {/* Modify itinerary */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="flex gap-2">
          <input
            value={modifyInstruction}
            onChange={e => setModifyInstruction(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleModify() }}
            placeholder="修改此方案，例如：减少开车时间 / 加一家海鲜餐厅 / 酒店换成民宿"
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
            disabled={modifying}
          />
          <button
            onClick={handleModify}
            disabled={modifying || !modifyInstruction.trim()}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition"
          >
            {modifying ? '修改中…' : '✏️ 修改'}
          </button>
        </div>
        {modifyError && <div className="text-xs text-red-500 mt-1.5">{modifyError}</div>}
      </div>

      {/* Feasibility warnings */}
      {warnings.length > 0 && (
        <div className="px-4 sm:px-6 pt-4">
          <div className="p-3 bg-amber-50 rounded-xl space-y-1.5">
            {warnings.map((w, i) => (
              <div key={i} className="text-xs text-amber-800 flex items-start gap-1.5">
                <span className="shrink-0">⚠️</span>
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map + Timeline */}
      <div className="p-3 sm:p-6">
        <MapTimeline
          itinerary={itinerary}
          destinationCoords={plan.destinations || []}
        />
      </div>

      {/* Budget breakdown */}
      <div className="px-4 sm:px-6 pb-6">
        <BudgetBreakdown
          itinerary={itinerary}
          totalMin={plan.totalBudgetMin}
          totalMax={plan.totalBudgetMax}
          currency={currencyForCountry(plan.country)}
        />
      </div>

      {/* Food & Stay summary */}
      <div className="px-4 sm:px-6 pb-6">
        <FoodStaySummary days={plan.days} />
      </div>
    </div>
  )
}
