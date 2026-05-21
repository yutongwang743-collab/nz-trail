import { SkeletonGrid } from '@/components/SkeletonCard'

export default function HomeLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-8 animate-pulse">
        <div className="h-7 w-48 rounded bg-gray-200 mb-2" />
        <div className="h-4 w-80 rounded bg-gray-100" />
      </div>
      <SkeletonGrid />
    </div>
  )
}
