import { Suspense } from 'react'
import { getRoutes, getRecentPosts } from '@/lib/data'
import HeroSection from '@/components/HeroSection'
import HomeContent from '@/components/HomeContent'
import TrustSection from '@/components/TrustSection'

export default async function HomePage() {
  const routes = await getRoutes()
  const posts = await getRecentPosts(6)

  return (
    <>
      <HeroSection />
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
        <Suspense fallback={<div className="py-10 text-center text-gray-400">加载中…</div>}>
          <HomeContent routes={routes} posts={posts} />
        </Suspense>
        <TrustSection />
      </div>
    </>
  )
}
