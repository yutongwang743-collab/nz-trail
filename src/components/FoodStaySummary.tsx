interface Restaurant {
  name: string
  dish: string
  price: string
  tip?: string
}

interface Day {
  day: number
  restaurants?: Restaurant[]
  accommodation?: string
}

export default function FoodStaySummary({ days }: { days: Day[] }) {
  const restaurants: Array<Restaurant & { day: number }> = []
  days.forEach(d => (d.restaurants || []).forEach(r => restaurants.push({ ...r, day: d.day })))

  const stays = days.filter(d => d.accommodation)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 餐厅速览 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3">🍽️ 餐厅速览</h3>
        {restaurants.length === 0 ? (
          <p className="text-xs text-gray-400">暂无餐厅推荐</p>
        ) : (
          <div className="space-y-2">
            {restaurants.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <span className="text-gray-800 font-medium">{r.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{r.dish}</span>
                </div>
                <span className="text-xs text-gray-500 shrink-0 ml-2">{r.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 住宿速览 */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3">🏨 住宿速览</h3>
        {stays.length === 0 ? (
          <p className="text-xs text-gray-400">暂无住宿信息</p>
        ) : (
          <div className="space-y-2">
            {stays.map(d => (
              <div key={d.day} className="flex items-center justify-between text-sm">
                <span className="text-xs text-gray-400 shrink-0">Day {d.day}</span>
                <span className="text-gray-700 ml-3 text-right">{d.accommodation}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
