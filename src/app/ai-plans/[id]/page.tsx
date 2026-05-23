'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import MapTimeline from '@/components/MapTimeline'
import BudgetBreakdown from '@/components/BudgetBreakdown'
import SaveButton from '@/components/SaveButton'
import { getLocationImage } from '@/lib/nz-images'
import { getAIHistory, type AIHistoryEntry } from '@/lib/aiHistory'
import { getSavedPlans } from '@/lib/savedPlans'

export default function AIPlanPage() {
  const params = useParams()
  const id = params.id as string
  const [entry, setEntry] = useState<AIHistoryEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [variantIdx, setVariantIdx] = useState(0)

  useEffect(() => {
    // Search both history and saved plans
    let found: AIHistoryEntry | null = null
    const history = getAIHistory()
    found = history.find(h => h.id === id) || null
    if (!found) {
      const saved = getSavedPlans()
      const match = saved.find(p => p.id === id && p.aiData)
      if (match) {
        found = {
          id: match.id,
          title: match.title,
          description: match.description,
          region: match.region,
          createdAt: match.savedAt,
          aiData: match.aiData,
        }
      }
    }
    setEntry(found)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">
        加载中...
      </div>
    )
  }

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg mb-4">未找到该 AI 行程</p>
        <Link href="/my-plans" className="btn-primary inline-flex items-center gap-2">
          ← 返回我的计划
        </Link>
      </div>
    )
  }

  const data = entry.aiData
  const variant = data.variants?.[variantIdx]
  const destinations = data.destinations || []

  const itinerary = variant?.days?.map((day: any) => ({
    ...day,
    photoSpots: (day.photoSpots || []).map((ps: any) => ({
      ...ps,
      image: getLocationImage(ps.name || 'landmark', 320, 240).url,
    })),
    restaurants: (day.restaurants || []).map((r: any) => ({
      ...r,
      image: getLocationImage(r.name || 'restaurant', 320, 240).url,
    })),
  })) || []

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/my-plans" className="hover:text-gray-600">我的计划</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{data.title}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
            🤖 AI 生成
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {data.region}
          </span>
          {(data.typeTags || []).slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{data.title}</h1>
            <p className="text-gray-500 text-sm line-clamp-2">{data.description}</p>
          </div>
          <SaveButton
            plan={{
              type: 'ai',
              title: data.title,
              description: data.description,
              region: data.region,
              aiData: data,
            }}
          />
        </div>
      </div>

      {/* Variant selector */}
      {data.variants?.length > 1 && (
        <div className="flex gap-2 mb-6">
          {data.variants.map((v: any, i: number) => (
            <button
              key={i}
              onClick={() => setVariantIdx(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                i === variantIdx
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {v.budgetLevel} · {v.duration}
            </button>
          ))}
        </div>
      )}

      {/* Map + Timeline */}
      {variant && itinerary.length > 0 && (
        <MapTimeline
          itinerary={itinerary}
          destinationCoords={destinations}
        />
      )}

      {/* Budget */}
      {variant && itinerary.length > 0 && (
        <div className="mt-8">
          <BudgetBreakdown
            itinerary={itinerary}
            totalMin={variant.totalBudgetMin}
            totalMax={variant.totalBudgetMax}
          />
        </div>
      )}
    </div>
  )
}
