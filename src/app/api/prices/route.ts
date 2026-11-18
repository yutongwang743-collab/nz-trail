import { NextRequest, NextResponse } from 'next/server'
import { searchFlightOffers } from '@/lib/amadeus'
import { prisma } from '@/lib/prisma'

// 实时价格查询：接入 Amadeus，未配置则返回 configured:false（前端降级为 AI 估算）
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { type, origin, destination, date, adults } = body

  if (type === 'flight') {
    if (!origin || !destination || !date) {
      return NextResponse.json({ error: '缺少 origin/destination/date' }, { status: 400 })
    }

    const offers = await searchFlightOffers({ origin, destination, date, adults: adults || 2 })

    if (offers === null) {
      return NextResponse.json({ configured: false, message: '价格服务未配置（需 AMADEUS_CLIENT_ID/SECRET）' })
    }

    // 存价格快照
    for (const o of offers) {
      await prisma.priceRecord.create({ data: { ...o, fetchedAt: new Date() } })
    }

    return NextResponse.json({ configured: true, offers })
  }

  return NextResponse.json({ error: '暂只支持 type=flight' }, { status: 400 })
}

export async function GET() {
  // 返回已缓存的价格快照（按 itemName 分组取最新）
  const records = await prisma.priceRecord.findMany({
    orderBy: { fetchedAt: 'desc' },
    take: 50,
  })
  return NextResponse.json({ records })
}
