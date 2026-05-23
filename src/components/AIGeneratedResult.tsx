'use client'

import { useState } from 'react'
import MapTimeline from './MapTimeline'
import BudgetBreakdown from './BudgetBreakdown'
import SaveButton from './SaveButton'
import { getLocationImage } from '@/lib/nz-images'

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

interface AIVariant {
  duration: string
  budgetLevel: string
  totalBudgetMin: number
  totalBudgetMax: number
  days: AIDay[]
}

interface Destination {
  name: string
  slug: string
  coordinates: [number, number]
  image: string
  description: string
}

interface AIGeneratedData {
  title: string
  description: string
  region: string
  bestSeason: string[]
  typeTags: string[]
  variants: AIVariant[]
  destinations: Destination[]
}

interface Props {
  data: AIGeneratedData
  onClose: () => void
}

const REGION_COLOR: Record<string, string> = {
  '南岛': 'bg-emerald-100 text-emerald-800',
  '北岛': 'bg-sky-100 text-sky-800',
  '跨岛': 'bg-purple-100 text-purple-800',
}

const BUDGET_ICON: Record<string, string> = {
  '穷游': '💰',
  '舒适': '💰💰',
  '奢华': '💰💰💰',
}

export default function AIGeneratedResult({ data, onClose }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(0)

  const variant = data.variants[selectedVariant]
  if (!variant) return null

  const itinerary = variant.days.map(day => ({
    ...day,
    photoSpots: (day.photoSpots || []).map(ps => ({ ...ps, image: getLocationImage(ps.name, 320, 240).url })),
    restaurants: (day.restaurants || []).map(r => ({ ...r, image: getLocationImage(r.name, 320, 240).url })),
  }))

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-soft-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white/80 text-xs px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm">
                🤖 AI 生成
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${REGION_COLOR[data.region] || 'bg-gray-100 text-gray-700'}`}>
                {data.region}
              </span>
              {(data.typeTags || []).slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-white">{data.title}</h2>
            <p className="text-white/70 text-sm mt-1 max-w-lg">{data.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <SaveButton
              plan={{
                type: 'ai',
                title: data.title,
                description: data.description,
                region: data.region,
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

        {/* Variant selector */}
        {data.variants.length > 1 && (
          <div className="flex gap-2 mt-4">
            {data.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  i === selectedVariant
                    ? 'bg-white text-gray-900 shadow'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {BUDGET_ICON[v.budgetLevel]} {v.budgetLevel} · {v.duration}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map + Timeline */}
      <div className="p-4 sm:p-6">
        <MapTimeline
          itinerary={itinerary}
          destinationCoords={data.destinations || []}
        />
      </div>

      {/* Budget breakdown */}
      <div className="px-4 sm:px-6 pb-6">
        <BudgetBreakdown
          itinerary={itinerary}
          totalMin={variant.totalBudgetMin}
          totalMax={variant.totalBudgetMax}
        />
      </div>
    </div>
  )
}
