import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDestinationBySlug } from '@/lib/data'
import TravelGuide from '@/components/TravelGuide'
import RouteCard from '@/components/RouteCard'
import ExpandablePostCard from '@/components/ExpandablePostCard'

interface DestinationPageProps {
  params: { slug: string }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const dest = await getDestinationBySlug(params.slug)
  if (!dest) notFound()

  const xhsSearchUrl = `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(dest.name + ' 新西兰')}&type=51`

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{dest.name}</span>
      </div>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={dest.coverImage}
          alt={dest.name}
          className="w-full aspect-[16/9] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
              {dest.region}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white/90">
              {dest.type === 'city' ? '城市' : dest.type === 'natural_attraction' ? '自然景点' : '活动点'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{dest.name}</h1>
          <p className="text-white/80 text-sm">{dest.description}</p>
        </div>
        <a
          href={xhsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white transition hover:shadow-md"
          style={{ background: 'linear-gradient(135deg, #ff5a5f, #e51d1d)' }}
        >
          📕 在小红书搜索
        </a>
      </div>

      {/* Travel Guide */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📋 旅行指南</h2>
        <TravelGuide info={dest.practicalInfo} />
      </div>

      {/* Routes passing through */}
      {dest.routes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🗺️ 经过此地的路线 ({dest.routes.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dest.routes.map(route => (
              <div key={route.id} className="relative">
                <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-0.5 rounded-full text-gray-700">
                  Day {route.dayIndex} 经过
                </div>
                <RouteCard route={route} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related posts */}
      {dest.posts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              📱 相关小红书体验
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
            {dest.posts.map(post => (
              <ExpandablePostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
