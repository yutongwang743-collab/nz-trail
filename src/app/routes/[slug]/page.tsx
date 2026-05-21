import { notFound } from 'next/navigation'
import { getRouteBySlug } from '@/lib/data'
import MapTimeline from '@/components/MapTimeline'
import BudgetBreakdown from '@/components/BudgetBreakdown'
import VariantSelector from '@/components/VariantSelector'
import ExpandablePostCard from '@/components/ExpandablePostCard'
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{route.title}</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{route.region}</span>
          {(route.typeTags as string[]).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">{tag}</span>
          ))}
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{route.title}</h1>
            <p className="text-gray-500">{route.description}</p>
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
        <BudgetBreakdown
          itinerary={activeVariant.itinerary}
          totalMin={activeVariant.totalBudgetMin}
          totalMax={activeVariant.totalBudgetMax}
        />
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
