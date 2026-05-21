'use client'

import { TYPE_TAG_OPTIONS, SEASON_OPTIONS, DURATION_OPTIONS, SEASON_LABELS, type FilterState } from '@/lib/types'

interface FilterBarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  function toggle(arr: string[], val: string): string[] {
    return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
  }

  return (
    <div className="space-y-3 px-4 py-4 bg-gray-50 rounded-2xl">
      {/* 体验类型 */}
      <div>
        <div className="text-xs font-medium text-gray-500 mb-2">体验类型</div>
        <div className="flex flex-wrap gap-2">
          {TYPE_TAG_OPTIONS.map(tag => (
            <button
              key={tag}
              onClick={() => onChange({ ...filters, typeTags: toggle(filters.typeTags, tag) })}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                filters.typeTags.includes(tag)
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 季节 */}
      <div>
        <div className="text-xs font-medium text-gray-500 mb-2">适合季节</div>
        <div className="flex flex-wrap gap-2">
          {SEASON_OPTIONS.map(season => (
            <button
              key={season}
              onClick={() => onChange({ ...filters, seasons: toggle(filters.seasons, season) })}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                filters.seasons.includes(season)
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {SEASON_LABELS[season]}
            </button>
          ))}
        </div>
      </div>

      {/* 天数 */}
      <div>
        <div className="text-xs font-medium text-gray-500 mb-2">行程天数</div>
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map(dur => (
            <button
              key={dur}
              onClick={() => onChange({ ...filters, durations: toggle(filters.durations, dur) })}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                filters.durations.includes(dur)
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {dur}
            </button>
          ))}
        </div>
      </div>

      {/* 重置 */}
      {(filters.typeTags.length > 0 || filters.seasons.length > 0 || filters.durations.length > 0) && (
        <button
          onClick={() => onChange({ typeTags: [], seasons: [], durations: [] })}
          className="text-sm text-red-500 hover:text-red-700"
        >
          清除筛选
        </button>
      )}
    </div>
  )
}
