import { SkeletonDetail } from '@/components/SkeletonCard'

export default function RouteDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <SkeletonDetail />
    </div>
  )
}
