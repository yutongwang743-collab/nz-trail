'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import FilterBar from './FilterBar'
import RouteCard from './RouteCard'
import DiscoveryWizard from './DiscoveryWizard'
import { matchRoutes, type MatchResult } from '@/lib/matchRoutes'
import type { RouteWithVariants, FilterState, WizardAnswers } from '@/lib/types'
import { TYPE_TAG_OPTIONS, SEASON_OPTIONS, DURATION_OPTIONS } from '@/lib/types'

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

function parseFiltersFromParams(params: URLSearchParams): FilterState {
  return {
    typeTags: params.get('tags')?.split(',').filter(t => TYPE_TAG_OPTIONS.includes(t as any)) || [],
    seasons: params.get('seasons')?.split(',').filter(s => SEASON_OPTIONS.includes(s as any)) || [],
    durations: params.get('durations')?.split(',').filter(d => DURATION_OPTIONS.includes(d as any)) || [],
  }
}

function filtersToParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.typeTags.length) params.set('tags', filters.typeTags.join(','))
  if (filters.seasons.length) params.set('seasons', filters.seasons.join(','))
  if (filters.durations.length) params.set('durations', filters.durations.join(','))
  return params
}

export default function HomeContent({ routes, posts }: HomeContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filters, setFilters] = useState<FilterState>(() => parseFiltersFromParams(searchParams))
  const [matchResults, setMatchResults] = useState<MatchResult[] | null>(null)
  const [hasSeenWizard, setHasSeenWizard] = useState(true)

  // Sync filters → URL
  useEffect(() => {
    const params = filtersToParams(filters)
    const qs = params.toString()
    const currentQs = searchParams.toString()
    if (qs !== currentQs) {
      router.replace(qs ? `/?${qs}` : '/', { scroll: false })
    }
  }, [filters, router, searchParams])

  const handleWizardComplete = useCallback((answers: WizardAnswers) => {
    localStorage.setItem('wizard_seen', '1')
    setHasSeenWizard(true)
    const results = matchRoutes(routes, answers)
    setMatchResults(results)
  }, [routes])

  const handleWizardSkip = useCallback(() => {
    localStorage.setItem('wizard_seen', '1')
    setHasSeenWizard(true)
    setMatchResults(null)
  }, [])

  // Derive display list with client-side filters applied on top
  const displayResults = useMemo(() => {
    const source: MatchResult[] = matchResults ?? routes.map(r => ({
      route: r,
      score: 0,
      maxScore: 0,
      tags: [] as string[],
      perPersonBudget: undefined,
    }))

    if (filters.typeTags.length === 0 && filters.seasons.length === 0 && filters.durations.length === 0) {
      return source
    }

    return source.filter(({ route }) => {
      if (filters.typeTags.length > 0 && !route.typeTags.some(t => filters.typeTags.includes(t))) return false
      if (filters.seasons.length > 0 && !route.bestSeason.some(s => filters.seasons.includes(s))) return false
      if (filters.durations.length > 0 && !route.variants.some(v => filters.durations.includes(v.duration))) return false
      return true
    })
  }, [routes, matchResults, filters])

  const hasFilters = filters.typeTags.length > 0 || filters.seasons.length > 0 || filters.durations.length > 0

  // Split results into matched vs other (only meaningful when wizard is active)
  const scoredResults = matchResults ? displayResults.filter(r => r.score > 0) : []
  const otherResults = matchResults ? displayResults.filter(r => r.score === 0) : []

  return (
    <div className="space-y-8">
      {/* Discovery Wizard */}
      <DiscoveryWizard
        onComplete={handleWizardComplete}
        onSkip={handleWizardSkip}
        hasSeenBefore={hasSeenWizard}
      />

      <FilterBar filters={filters} onChange={setFilters} />

      {/* 小红书热门帖子 — only when no filters and no wizard results */}
      {!hasFilters && !matchResults && posts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              小红书热门体验
            </h2>
            <span className="text-xs text-gray-400">
              来自真实留学生分享
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
  )
}
