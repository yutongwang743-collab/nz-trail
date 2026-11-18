// 机票比价双源客户端：SerpApi(Google Flights) + Ignav。
// 未配置对应 API key 时返回 null（调用方标记为未配置）。

export interface FlightPrice {
  source: 'serpapi' | 'ignav'
  price: number
  currency: string
  airline?: string
  durationMinutes?: number
}

export interface FlightSearchParams {
  origin: string
  destination: string
  date: string // YYYY-MM-DD
  adults?: number
}

// SerpApi Google Flights：250 次/月免费，真实 Google Flights 价格
export async function searchSerpApiFlights(p: FlightSearchParams): Promise<FlightPrice[] | null> {
  const key = process.env.SERPAPI_API_KEY
  if (!key) return null

  try {
    const qs = new URLSearchParams({
      engine: 'google_flights',
      departure_id: p.origin,
      arrival_id: p.destination,
      outbound_date: p.date,
      adults: String(p.adults || 1),
      currency: 'AUD',
      type: '2', // 单程（否则默认往返会要求 return_date）
      api_key: key,
    })
    const res = await fetch(`https://serpapi.com/search.json?${qs}`)
    const data = await res.json()
    if (!res.ok || data.error) return null

    const flights = data.best_flights || data.other_flights || []
    return flights.slice(0, 5).map((f: any) => ({
      source: 'serpapi' as const,
      price: f.price ?? 0,
      currency: 'AUD',
      airline: f.flights?.[0]?.airline || f.flights?.[0]?.airline_operators?.[0]?.name || undefined,
      durationMinutes: f.total_duration,
    }))
  } catch (e) {
    console.error('SerpApi flight search failed:', e)
    return null
  }
}

// Ignav：1000 次免费（一次性），真实票价 + 预订链接
export async function searchIgnavFlights(p: FlightSearchParams): Promise<FlightPrice[] | null> {
  const key = process.env.IGNAV_API_KEY
  if (!key) return null

  try {
    const res = await fetch('https://ignav.com/api/fares/one-way', {
      method: 'POST',
      headers: { 'X-Api-Key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin: p.origin, destination: p.destination, departure_date: p.date }),
    })
    if (!res.ok) return null
    const data = await res.json()

    return (data.itineraries || []).slice(0, 5).map((it: any) => ({
      source: 'ignav' as const,
      price: it.price?.amount ?? 0,
      currency: it.price?.currency || 'USD',
      airline: it.outbound?.carrier || undefined,
      durationMinutes: it.outbound?.duration_minutes,
    }))
  } catch (e) {
    console.error('Ignav flight search failed:', e)
    return null
  }
}
