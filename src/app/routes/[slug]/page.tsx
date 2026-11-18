import { notFound } from 'next/navigation'
import { getRouteBySlug } from '@/lib/data'
import { currencyForCountry } from '@/lib/types'
import MapTimeline from '@/components/MapTimeline'
import BudgetBreakdown from '@/components/BudgetBreakdown'
import BookingLinks from '@/components/BookingLinks'
import FlightPriceCompare from '@/components/FlightPriceCompare'
import FoodStaySummary from '@/components/FoodStaySummary'
import VariantSelector from '@/components/VariantSelector'
import ExpandablePostCard from '@/components/ExpandablePostCard'
import SaveButtonWrapper from '@/components/SaveButtonWrapper'
import Link from 'next/link'

interface RoutePageProps {
  params: { slug: string }
  searchParams: { variant?: string }
}

export default async function RoutePage({ params, searchParams }: RoutePageProps) {
  const route = await getRouteBySlug(params.slug)
  if (!route) notFound()

  const variantId = searchParams.variant ? parseInt(searchParams.variant) : route.variants[0]?.id
  const activeVariant = route.variants.find(v => v.id === variantId) || route.variants[0]

  const durationOptions = [...new Set(route.variants.map(v => v.duration))]
  const budgetLevels = [...new Set(route.variants.map(v => v.budgetLevel))]

  const destinationCoords = route.destinations.map(d => {
    const [lat, lng] = d.destination.coordinates.split(',').map(Number)
    return {
      name: d.destination.name,
      slug: d.destination.slug,
      coordinates: [lng, lat] as [number, number],
      image: d.destination.coverImage || '',
      description: d.destination.description || '',
    }
  })

  const xhsSearchUrl = `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(route.title)}&type=51`

  const REGION_AIRPORT: Record<string, string> = {
    '塔斯马尼亚': 'HBA',
    '南岛': 'ZQN',
    '北岛': 'AKL',
  }
  const destAirport = REGION_AIRPORT[route.region] || 'HBA'

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{route.title}</span>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{route.country} · {route.region}</span>
          {(route.typeTags as string[]).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">{tag}</span>
          ))}
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{route.title}</h1>
            <p className="text-gray-500">{route.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <SaveButtonWrapper
              plan={{
                type: 'route',
                title: route.title,
                description: route.description,
                country: route.country,
                region: route.region,
                routeId: route.id,
                routeSlug: route.slug,
                variantDuration: activeVariant.duration,
                variantBudget: activeVariant.budgetLevel,
              }}
            />
          </div>
          {/* 小红书搜索按钮 */}
          <a
            href={xhsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #ff5a5f, #e51d1d)', color: 'white' }}
          >
            <span>📕</span>
            在小红书搜索攻略
          </a>
        </div>
      </div>

      {route.variants.length > 0 && (
        <div className="mb-6">
          <VariantSelector
            variants={route.variants}
            activeVariantId={activeVariant.id}
            activeDuration={activeVariant.duration}
          />
        </div>
      )}

      {/* 概览 */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-3">
          <div className="text-xs text-gray-400">📅 天数</div>
          <div className="text-sm font-semibold text-gray-900 mt-0.5">{durationOptions.join(' / ')}</div>
        </div>
        <div className="card p-3">
          <div className="text-xs text-gray-400">💰 预算</div>
          <div className="text-sm font-semibold text-gray-900 mt-0.5">{budgetLevels.join(' / ')}</div>
          <div className="text-xs text-gray-500">{currencyForCountry(route.country)} {activeVariant.totalBudgetMin}-{activeVariant.totalBudgetMax}</div>
        </div>
        <div className="card p-3">
          <div className="text-xs text-gray-400">🗺️ 目的地</div>
          <div className="text-sm font-semibold text-gray-900 mt-0.5">{route.destinations.length} 站</div>
        </div>
        <div className="card p-3">
          <div className="text-xs text-gray-400">🚗 类型</div>
          <div className="text-sm font-semibold text-gray-900 mt-0.5">{(route.typeTags as string[]).slice(0, 2).join(' · ')}</div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">🗺️ 地图与每日行程</h2>
      <MapTimeline
        itinerary={activeVariant.itinerary}
        destinationCoords={destinationCoords}
        relatedPosts={(route.posts || []).map(p => ({
          id: p.id,
          title: p.title,
          authorName: p.authorName,
          likes: p.likes,
          saves: p.saves,
          comments: p.comments,
          sourcePlatform: p.sourcePlatform,
          sourceUrl: p.sourceUrl,
          aiLocations: (p.aiSummary as any)?.locations || [],
        }))}
      />

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">💰 预算明细</h2>
        <BudgetBreakdown
          itinerary={activeVariant.itinerary}
          totalMin={activeVariant.totalBudgetMin}
          totalMax={activeVariant.totalBudgetMax}
          currency={currencyForCountry(route.country)}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">✈️ 订票与比价</h2>
        <BookingLinks country={route.country} region={route.region} />
      </div>

      <div className="mt-4">
        <FlightPriceCompare defaultDestination={destAirport} />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🍽️ 餐厅与住宿</h2>
        <FoodStaySummary days={activeVariant.itinerary} />
      </div>

      {route.posts && route.posts.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              📱 小红书真实体验
            </h2>
            <a
              href={xhsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-500 hover:text-brand-600"
            >
              查看更多 →
            </a>
          </div>
          <div className="space-y-3">
            {route.posts.map(post => (
              <ExpandablePostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
