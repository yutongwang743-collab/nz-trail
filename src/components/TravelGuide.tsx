import type { PracticalInfo } from '@/lib/types'
import Link from 'next/link'
import { Calendar, Ticket, Car, Clock, Building2, Mountain, Hash } from 'lucide-react'

interface TravelGuideProps {
  info: PracticalInfo
}

function xhsSearchUrl(tag: string) {
  return `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(tag)}&type=51`
}

const iconCls = "w-5 h-5 text-brand-500"

export default function TravelGuide({ info }: TravelGuideProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="card p-3 space-y-1">
        <Calendar className={iconCls} />
        <div className="text-xs font-medium text-surface-fg/60">最佳季节</div>
        <div className="text-xs text-surface-fg leading-relaxed">{info.bestSeason}</div>
      </div>

      <div className="card p-3 space-y-1">
        <Ticket className={iconCls} />
        <div className="text-xs font-medium text-surface-fg/60">门票参考</div>
        <div className="text-xs text-surface-fg leading-relaxed">{info.ticketPrice}</div>
      </div>

      <div className="card p-3 space-y-1">
        <Car className={iconCls} />
        <div className="text-xs font-medium text-surface-fg/60">如何到达</div>
        <div className="text-xs text-surface-fg leading-relaxed">{info.transport}</div>
      </div>

      <div className="card p-3 space-y-1">
        <Clock className={iconCls} />
        <div className="text-xs font-medium text-surface-fg/60">建议停留</div>
        <div className="text-xs text-surface-fg leading-relaxed">{info.stayDuration}</div>
      </div>

      <div className="card p-3 space-y-1">
        <Building2 className={iconCls} />
        <div className="text-xs font-medium text-surface-fg/60">住宿参考</div>
        <div className="text-xs text-surface-fg leading-relaxed">{info.accommodation}</div>
      </div>

      {info.nearbySpots.length > 0 && (
        <div className="card p-3 space-y-1">
          <Mountain className={iconCls} />
          <div className="text-xs font-medium text-surface-fg/60">附近景点</div>
          <div className="space-y-1">
            {info.nearbySpots.map(spot => (
              <Link
                key={spot.slug}
                href={`/destinations/${spot.slug}`}
                className="block text-xs text-brand-500 hover:text-brand-600"
              >
                {spot.name} · {spot.distance}
              </Link>
            ))}
          </div>
        </div>
      )}

      {info.xhsTags.length > 0 && (
        <div className="card p-3 space-y-1">
          <Hash className={iconCls} />
          <div className="text-xs font-medium text-surface-fg/60">小红书热门搜索</div>
          <div className="flex flex-wrap gap-1">
            {info.xhsTags.map(tag => (
              <a
                key={tag}
                href={xhsSearchUrl(tag)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full hover:bg-brand-100 transition"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
