import Link from 'next/link'
import { Mountain, Compass, MapPin } from 'lucide-react'
import { type RouteWithVariants } from '@/lib/types'
import ResultBadge from './ResultBadge'
import SaveButton from './SaveButton'

interface RouteCardProps {
  route: RouteWithVariants
  matchScore?: number
  maxScore?: number
  perPersonBudget?: { min: number; max: number }
}

function RegionIcon({ region }: { region: string }) {
  const cls = "w-8 h-8 text-white/70"
  if (region === '南岛') return <Mountain className={cls} />
  if (region === '北岛') return <Compass className={cls} />
  return <MapPin className={cls} />
}

export default function RouteCard({ route, matchScore, maxScore, perPersonBudget }: RouteCardProps) {
  const durationSet = [...new Set(route.variants.map(v => v.duration))]
  const budgetSet = [...new Set(route.variants.map(v => v.budgetLevel))]
  const minBudget = Math.min(...route.variants.map(v => v.totalBudgetMin))

  const sortedDests = [...route.destinations].sort((a, b) => a.dayIndex - b.dayIndex)
  const coverImage = sortedDests[0]?.destination?.coverImage || ''

  return (
    <Link
      href={`/routes/${route.slug}`}
      className="group card block hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover image from first destination */}
      <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        {coverImage ? (
          <img
            src={coverImage}
            alt={route.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget
              if (!el.dataset.failed) {
                el.dataset.failed = '1'
                el.style.display = 'none'
                el.nextElementSibling?.classList.remove('hidden')
              }
            }}
          />
        ) : null}
        {/* Fallback gradient (shown if no image or image fails) */}
        <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center ${coverImage ? 'hidden' : ''}`}>
          <RegionIcon region={route.region} />
        </div>
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Save button */}
        <div className="absolute top-3 right-3 z-10">
          <SaveButton
            plan={{
              type: 'route',
              title: route.title,
              description: route.description,
              region: route.region,
              routeId: route.id,
              routeSlug: route.slug,
              variantDuration: durationSet[0],
              variantBudget: budgetSet[0],
            }}
            className="!py-1.5 !px-3 !text-xs !rounded-lg !bg-black/40 hover:!bg-black/60 !text-white !backdrop-blur-sm shadow-lg"
          />
        </div>
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-sm text-white">
            {route.region}
          </span>
          {route.typeTags.slice(0, 1).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white/90">
              {tag}
            </span>
          ))}
        </div>
        {/* Bottom: route title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">
            {route.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white/80 text-xs">{durationSet.join(' / ')}</span>
            <span className="text-white/50 text-xs">·</span>
            <span className="text-white/80 text-xs">{budgetSet.join(' / ')}</span>
            <span className="text-white/50 text-xs">·</span>
            <span className="text-white text-xs font-semibold">NZD {minBudget}+</span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-500 line-clamp-2">{route.description}</p>
        {(matchScore !== undefined && matchScore > 0) && (
          <div className="pt-1">
            <ResultBadge score={matchScore} maxScore={maxScore ?? 0} perPersonBudget={perPersonBudget} />
          </div>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-400 overflow-x-auto">
          {sortedDests.slice(0, 4).map((d, i) => (
            <span key={d.destination.id} className="whitespace-nowrap">
              {d.destination.name}
              {i < Math.min(sortedDests.length, 4) - 1 ? ' →' : ''}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
