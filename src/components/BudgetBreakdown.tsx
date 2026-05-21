import type { ItineraryDay, CostBreakdown } from '@/lib/types'

interface BudgetBreakdownProps {
  itinerary: ItineraryDay[]
  totalMin: number
  totalMax: number
}

const KEYS: (keyof CostBreakdown)[] = ['住宿', '交通', '餐饮', '门票', '活动']

export default function BudgetBreakdown({ itinerary, totalMin, totalMax }: BudgetBreakdownProps) {
  const totals: CostBreakdown = { 住宿: 0, 交通: 0, 餐饮: 0, 门票: 0, 活动: 0 }
  itinerary.forEach(day => {
    KEYS.forEach(k => { totals[k] += day.costBreakdown[k] })
  })

  return (
    <div className="card p-4">
      <h3 className="font-semibold text-gray-900 mb-3">💰 费用明细（NZD / 人）</h3>

      <div className="mb-4 p-3 bg-brand-50 rounded-xl text-center">
        <span className="text-2xl font-bold text-brand-600">
          ${totalMin} - ${totalMax}
        </span>
        <span className="text-sm text-gray-500 ml-1">/ 全程</span>
      </div>

      <div className="space-y-2 mb-4">
        {KEYS.map(key => (
          <div key={key} className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{key}</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-400 rounded-full"
                  style={{ width: `${Math.min(100, (totals[key] / (totalMax || 1)) * 100)}%` }}
                />
              </div>
              <span className="text-gray-900 font-medium w-16 text-right">${totals[key]}</span>
            </div>
          </div>
        ))}
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-2 text-gray-400 font-medium">日期</th>
            {KEYS.map(k => <th key={k} className="text-right py-2 text-gray-400 font-medium">{k}</th>)}
            <th className="text-right py-2 text-gray-400 font-medium">小计</th>
          </tr>
        </thead>
        <tbody>
          {itinerary.map(day => {
            const dayTotal = KEYS.reduce((sum, k) => sum + day.costBreakdown[k], 0)
            return (
              <tr key={day.day} className="border-b border-gray-50">
                <td className="py-2 font-medium text-gray-700">Day {day.day}</td>
                {KEYS.map(k => (
                  <td key={k} className="py-2 text-right text-gray-600">
                    {day.costBreakdown[k] > 0 ? `$${day.costBreakdown[k]}` : '-'}
                  </td>
                ))}
                <td className="py-2 text-right font-medium text-gray-900">${dayTotal}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
