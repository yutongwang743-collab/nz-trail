'use client'

import { useRouter, usePathname } from 'next/navigation'
import { BUDGET_LABELS } from '@/lib/types'

interface VariantSelectorProps {
  variants: Array<{
    id: number
    duration: string
    budgetLevel: string
  }>
  activeVariantId: number
  activeDuration: string
}

const DURATION_ORDER = ['3-5天', '7-10天', '10-14天']

export default function VariantSelector({ variants, activeVariantId, activeDuration }: VariantSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  const variantsByDuration = new Map<string, typeof variants>()
  variants.forEach(v => {
    const key = v.duration
    if (!variantsByDuration.has(key)) variantsByDuration.set(key, [])
    variantsByDuration.get(key)!.push(v)
  })

  const durations = DURATION_ORDER.filter(d => variantsByDuration.has(d))

  function selectVariant(id: number) {
    router.push(`${pathname}?variant=${id}`, { scroll: false })
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto">
        {durations.map(dur => (
          <button
            key={dur}
            onClick={() => selectVariant(variantsByDuration.get(dur)![0].id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              activeDuration === dur
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {dur}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {(variantsByDuration.get(activeDuration) || []).map(v => {
          const info = BUDGET_LABELS[v.budgetLevel]
          return (
            <button
              key={v.id}
              onClick={() => selectVariant(v.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                activeVariantId === v.id
                  ? 'ring-2 ring-gray-900 ' + info.color
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {info.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
