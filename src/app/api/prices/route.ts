import { NextRequest, NextResponse } from 'next/server'
import { searchSerpApiFlights, searchIgnavFlights } from '@/lib/flightPrices'

// 机票比价：并行查询 SerpApi(Google Flights) + Ignav，未配置的源标记 configured:false
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { origin, destination, date, adults } = body

  if (!origin || !destination || !date) {
    return NextResponse.json({ error: '缺少 origin / destination / date' }, { status: 400 })
  }

  const params = { origin: String(origin).toUpperCase(), destination: String(destination).toUpperCase(), date, adults: adults || 1 }

  const [serpapi, ignav] = await Promise.all([
    searchSerpApiFlights(params),
    searchIgnavFlights(params),
  ])

  return NextResponse.json({
    origin: params.origin,
    destination: params.destination,
    date,
    sources: {
      serpapi: { configured: serpapi !== null, results: serpapi || [] },
      ignav: { configured: ignav !== null, results: ignav || [] },
    },
  })
}
