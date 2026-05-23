'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import FilterBar from './FilterBar'
import RouteCard from './RouteCard'
import DiscoveryWizard from './DiscoveryWizard'
import AIGeneratedResult from './AIGeneratedResult'
import { matchRoutes, type MatchResult } from '@/lib/matchRoutes'
import type { RouteWithVariants, FilterState, WizardAnswers, TravelStyle } from '@/lib/types'
import { DURATION_OPTIONS } from '@/lib/types'
import { getSavedPlans } from '@/lib/savedPlans'
import { addAIHistory } from '@/lib/aiHistory'

const VALID_DURATIONS = DURATION_OPTIONS as readonly string[]
const VALID_STYLES = ['徒步', '慢旅行', '公路自驾', '穷游', '冒险', '人文打卡'] as const

interface HomeContentProps {
  routes: RouteWithVariants[]
  posts: Array<{
    id: number
    title: string
    authorName: string
    authorAvatar: string
    sourcePlatform: string
    likes: number
    comments: number
    aiSummary: { locations?: string[]; activities?: string[]; duration?: string; budget?: string; keyTips?: string[] }
    route?: { title: string; slug: string } | null
  }>
}

// ── Style → filter logic ──

const STYLE_TAG_MAP: Record<TravelStyle, string[]> = {
  '徒步': ['自然徒步', '冰川湖泊'],
  '慢旅行': [],
  '公路自驾': ['自驾公路'],
  '穷游': [],
  '冒险': ['极限运动', '滑雪'],
  '人文打卡': ['霍比屯人文'],
}

function filterByStyle(routes: RouteWithVariants[], style: TravelStyle | null): RouteWithVariants[] {
  if (!style) return routes

  if (style === '慢旅行') {
    return routes.filter(r => !r.typeTags.some(t => ['极限运动', '滑雪'].includes(t)))
  }

  if (style === '穷游') {
    return routes.filter(r => r.variants.some(v => v.budgetLevel === '穷游'))
  }

  const tags = STYLE_TAG_MAP[style]
  return tags.length > 0 ? routes.filter(r => r.typeTags.some(t => tags.includes(t))) : routes
}

function filterByDuration(routes: RouteWithVariants[], duration: string | null): RouteWithVariants[] {
  if (!duration) return routes
  return routes.filter(r => r.variants.some(v => v.duration === duration))
}

// ── URL param helpers ──

function parseFiltersFromParams(params: URLSearchParams): FilterState {
  const style = params.get('style')
  const duration = params.get('duration')
  return {
    style: style && VALID_STYLES.includes(style as TravelStyle) ? (style as TravelStyle) : null,
    duration: duration && VALID_DURATIONS.includes(duration) ? (duration as FilterState['duration']) : null,
  }
}

function filtersToParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.style) params.set('style', filters.style)
  if (filters.duration) params.set('duration', filters.duration)
  return params
}

export default function HomeContent({ routes, posts }: HomeContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filters, setFilters] = useState<FilterState>(() => parseFiltersFromParams(searchParams))
  const [matchResults, setMatchResults] = useState<MatchResult[] | null>(null)
  const [hasSeenWizard, setHasSeenWizard] = useState(true)
  const [wizardAnswers, setWizardAnswers] = useState<WizardAnswers | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState<any>(null)
  const [aiError, setAiError] = useState<string | null>(null)

  // Sync filters → URL (preserve wizard & ai-plan params)
  useEffect(() => {
    const params = filtersToParams(filters)
    const wizard = searchParams.get('wizard')
    const aiPlan = searchParams.get('ai-plan')
    if (wizard) params.set('wizard', wizard)
    if (aiPlan) params.set('ai-plan', aiPlan)
    const qs = params.toString()
    const currentQs = searchParams.toString()
    if (qs !== currentQs) {
      router.replace(qs ? `/?${qs}` : '/', { scroll: false })
    }
  }, [filters, router, searchParams])

  // Load saved AI plan from "我的计划" link
  useEffect(() => {
    const aiPlanId = searchParams.get('ai-plan')
    if (!aiPlanId) return
    const plans = getSavedPlans()
    const plan = plans.find(p => p.id === aiPlanId && p.type === 'ai')
    if (plan?.aiData) {
      setAiResult(plan.aiData)
      // Scroll to it after render
      setTimeout(() => {
        document.getElementById('routes-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }, [searchParams])

  const handleWizardComplete = useCallback((answers: WizardAnswers) => {
    localStorage.setItem('wizard_seen', '1')
    setHasSeenWizard(true)
    setWizardAnswers(answers)
    const results = matchRoutes(routes, answers)
    setMatchResults(results)
    // Clean wizard param from URL
    if (searchParams.get('wizard')) {
      router.replace('/', { scroll: false })
    }
  }, [routes, searchParams, router])

  const handleWizardSkip = useCallback(() => {
    localStorage.setItem('wizard_seen', '1')
    setHasSeenWizard(true)
    setWizardAnswers(null)
    setMatchResults(null)
    if (searchParams.get('wizard')) {
      router.replace('/', { scroll: false })
    }
  }, [searchParams, router])

  const handleGenerateAI = useCallback(async () => {
    if (!wizardAnswers) return
    setAiLoading(true)
    setAiError(null)
    setAiResult(null)
    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wizardAnswers),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Generation failed')
      setAiResult(json)
      // Auto-save to AI history
      addAIHistory({
        id: `ai-${Date.now().toString(36)}`,
        title: json.title,
        description: json.description,
        region: json.region,
        createdAt: new Date().toISOString(),
        aiData: json,
      })
    } catch (err: any) {
      setAiError(err.message)
    } finally {
      setAiLoading(false)
    }
  }, [wizardAnswers])

  // Derive display list: apply client-side style + duration cross-filter
  const displayResults = useMemo(() => {
    const source: MatchResult[] = matchResults ?? routes.map(r => ({
      route: r,
      score: 0,
      maxScore: 0,
      tags: [] as string[],
      perPersonBudget: undefined,
    }))

    // Apply style filter
    let filtered = source.filter(({ route }) => {
      if (filters.style) {
        const styleFiltered = filterByStyle([route], filters.style)
        if (styleFiltered.length === 0) return false
      }
      return true
    })

    // Apply duration filter
    filtered = filtered.filter(({ route }) => {
      if (filters.duration) {
        const durFiltered = filterByDuration([route], filters.duration)
        if (durFiltered.length === 0) return false
      }
      return true
    })

    return filtered
  }, [routes, matchResults, filters])

  const hasFilters = filters.style !== null || filters.duration !== null

  // Split results into matched vs other (only meaningful when wizard is active)
  const scoredResults = matchResults ? displayResults.filter(r => r.score > 0) : []
  const otherResults = matchResults ? displayResults.filter(r => r.score === 0) : []

  return (
    <div className="space-y-8">
      {/* Discovery Wizard */}
      <div id="wizard-section" className="scroll-mt-20">
      <DiscoveryWizard
        onComplete={handleWizardComplete}
        onSkip={handleWizardSkip}
        hasSeenBefore={hasSeenWizard}
        forceOpen={searchParams.get('wizard') === '1'}
      />
      </div>

      {/* AI Generation — trigger + result */}
      {matchResults && wizardAnswers && (
        <div className="space-y-4">
          {!aiResult && (
            <button
              onClick={handleGenerateAI}
              disabled={aiLoading}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                aiLoading
                  ? 'bg-gray-100 text-gray-400 cursor-wait'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {aiLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" className="opacity-30" />
                    <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  AI 正在为你规划路线...
                </>
              ) : (
                <>
                  <span>🤖</span> AI 智能生成专属路线
                </>
              )}
            </button>
          )}
          {aiError && (
            <div className="py-3 px-4 bg-red-50 rounded-xl text-sm text-red-600 flex items-center gap-2">
              <span>⚠️</span> {aiError}
              <button onClick={handleGenerateAI} className="ml-auto text-red-700 underline text-xs">重试</button>
            </div>
          )}
          {aiResult && (
            <AIGeneratedResult data={aiResult} onClose={() => setAiResult(null)} />
          )}
        </div>
      )}

      <FilterBar filters={filters} onChange={setFilters} />

      {/* 小红书热门帖子 — only when no filters and no wizard results */}
      {!hasFilters && !matchResults && posts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              小红书热门体验
            </h2>
            <span className="text-xs text-gray-400">
              来自真实旅行者分享
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.slice(0, 3).map(post => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="card p-4 hover:shadow-md transition group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    {post.authorName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700 truncate">{post.authorName}</div>
                    <div className="text-xs text-gray-400">{post.sourcePlatform}</div>
                  </div>
                  {post.route && (
                    <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">
                      {post.route.title}
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-500 transition-colors">
                  {post.title}
                </h3>
                {post.aiSummary.locations && post.aiSummary.locations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.aiSummary.locations.slice(0, 3).map((loc: string, i: number) => (
                      <span key={i} className="text-xs text-brand-500 bg-brand-50 px-1.5 py-0.5 rounded">
                        📍 {loc}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Matched routes — wizard results */}
      <div id="routes-section" className="scroll-mt-20">
      {matchResults && scoredResults.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              🎯 为你推荐 ({scoredResults.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scoredResults.map(({ route, score, maxScore, perPersonBudget }) => (
              <RouteCard
                key={route.id}
                route={route}
                matchScore={score}
                maxScore={maxScore}
                perPersonBudget={perPersonBudget}
              />
            ))}
          </div>
        </section>
      )}

      {/* All routes / Other recommendations */}
      {(!matchResults || otherResults.length > 0) && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {matchResults
              ? `其他推荐路线 (${otherResults.length})`
              : hasFilters
                ? `筛选结果 (${displayResults.length})`
                : '精选路线'
            }
          </h2>
          {displayResults.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              没有符合筛选条件的路线，试试放宽条件
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(matchResults ? otherResults : displayResults).map(result => (
                <RouteCard
                  key={result.route.id}
                  route={result.route}
                  matchScore={matchResults ? result.score : undefined}
                  maxScore={matchResults ? result.maxScore : undefined}
                  perPersonBudget={matchResults ? result.perPersonBudget : undefined}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 更多帖子 */}
      {!hasFilters && !matchResults && posts.length > 3 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              更多真实体验
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.slice(3, 6).map(post => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="card p-4 hover:shadow-md transition group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                    {post.authorName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700 truncate">{post.authorName}</div>
                    <div className="text-xs text-gray-400">{post.sourcePlatform}</div>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-500 transition-colors">
                  {post.title}
                </h3>
                {post.aiSummary.keyTips && post.aiSummary.keyTips.length > 0 && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                    💡 {post.aiSummary.keyTips[0]}
                  </p>
                )}
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  )
}
