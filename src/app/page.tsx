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
        <HomeContent routes={routes} posts={posts} />
        <TrustSection />
      </div>
    </>
  )
}
