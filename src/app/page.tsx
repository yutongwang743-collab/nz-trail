import { getRoutes, getRecentPosts } from '@/lib/data'
import HomeContent from '@/components/HomeContent'

export default async function HomePage() {
  const routes = await getRoutes()
  const posts = await getRecentPosts(6)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          新西兰旅行计划
        </h1>
        <p className="text-gray-500">
          为留学生精选的真实路线，每一条都来自真实体验
        </p>
      </div>

      <HomeContent routes={routes} posts={posts} />
    </div>
  )
}
