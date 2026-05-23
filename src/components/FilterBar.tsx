'use client'

import type { FilterState, TravelStyle } from '@/lib/types'

interface StyleOption {
  value: TravelStyle | null
  icon: string
  label: string
}

const STYLE_OPTIONS: StyleOption[] = [
  { value: null, icon: '🌿', label: '全部' },
  { value: '徒步', icon: '🏔️', label: '徒步' },
  { value: '慢旅行', icon: '😌', label: '慢旅行' },
  { value: '公路自驾', icon: '🚗', label: '公路' },
  { value: '穷游', icon: '💰', label: '穷游' },
  { value: '冒险', icon: '🪂', label: '冒险' },
  { value: '人文打卡', icon: '🎬', label: '人文' },
]

const DURATION_OPTIONS = [
  { value: null, label: '不限' },
  { value: '3-5天' as const, label: '3-5天' },
  { value: '7-10天' as const, label: '7-10天' },
  { value: '10-14天' as const, label: '10-14天' },
]

interface FilterBarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Row 1: Travel style — single select */}
      <div className="flex flex-wrap gap-2">
        {STYLE_OPTIONS.map(opt => {
          const isActive = filters.style === opt.value
          return (
            <button
              key={opt.value ?? '__all__'}
              onClick={() => onChange({ ...filters, style: isActive ? null : opt.value })}
              className={`px-3 py-1.5 md:px-3.5 md:py-2 rounded-full text-[13px] md:text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20 scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="mr-1">{opt.icon}</span>
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Row 2: Duration — single select */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 mr-1">时长</span>
        {DURATION_OPTIONS.map(opt => {
          const isActive = filters.duration === opt.value
          return (
            <button
              key={opt.value ?? '__all__'}
              onClick={() => onChange({ ...filters, duration: opt.value })}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
