'use client'

import { useState } from 'react'

interface FlightPrice {
  source: string
  price: number
  currency: string
  airline?: string
  durationMinutes?: number
}

interface SourceResult {
  configured: boolean
  results: FlightPrice[]
}

function fmtDuration(min?: number): string {
  if (!min) return ''
  return `${Math.floor(min / 60)}h${min % 60}m`
}

export default function FlightPriceCompare({ defaultDestination = 'HBA' }: { defaultDestination?: string }) {
  const [origin, setOrigin] = useState('SYD')
  const [destination, setDestination] = useState(defaultDestination)
  const [date, setDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return d.toISOString().slice(0, 10)
  })
  const [loading, setLoading] = useState(false)
  const [sources, setSources] = useState<Record<string, SourceResult> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const query = async () => {
    setLoading(true)
    setError(null)
    setSources(null)
    try {
      const res = await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, date }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || '查询失败')
      setSources(json.sources)
    } catch (e: any) {
      setError(e?.message || '查询失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-semibold text-gray-900">✈️ 机票比价</h3>
        <span className="text-xs text-gray-400">SerpApi(Google Flights) vs Ignav · 实时价</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <input
          value={origin}
          onChange={e => setOrigin(e.target.value.toUpperCase())}
          placeholder="出发机场 SYD"
          className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <input
          value={destination}
          onChange={e => setDestination(e.target.value.toUpperCase())}
          placeholder="到达机场 HBA"
          className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <button
          onClick={query}
          disabled={loading || !origin || !destination || !date}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition"
        >
          {loading ? '查询中…' : '🔍 查询比价'}
        </button>
      </div>

      {error && <div className="text-xs text-red-500 mb-2">{error}</div>}

      {sources && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(['serpapi', 'ignav'] as const).map(src => {
            const s = sources[src]
            const label = src === 'serpapi' ? 'SerpApi · Google Flights' : 'Ignav'
            return (
              <div key={src} className="rounded-xl border border-gray-200 p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">{label}</div>
                {!s || !s.configured ? (
                  <div className="text-xs text-gray-400">未配置（需 {src === 'serpapi' ? 'SERPAPI_API_KEY' : 'IGNAV_API_KEY'}）</div>
                ) : s.results.length === 0 ? (
                  <div className="text-xs text-gray-400">该航线无结果</div>
                ) : (
                  <div className="space-y-1.5">
                    {s.results.map((r, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 truncate">
                          {r.airline || '航班'}{r.durationMinutes ? ` · ${fmtDuration(r.durationMinutes)}` : ''}
                        </span>
                        <span className="font-medium text-brand-600 shrink-0 ml-2">{r.currency} {r.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
