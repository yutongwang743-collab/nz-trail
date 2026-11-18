// Amadeus Self-Service 客户端（机票/酒店实时价）。
// 未配置 AMADEUS_CLIENT_ID / AMADEUS_CLIENT_SECRET 时，相关函数返回 null（调用方降级为 AI 估算）。

const AMADEUS_BASE = 'https://test.api.amadeus.com' // 测试环境；上线换 https://api.amadeus.com

interface Credentials {
  clientId: string
  clientSecret: string
}

function getCredentials(): Credentials | null {
  const clientId = process.env.AMADEUS_CLIENT_ID
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET
  if (!clientId || !clientSecret) return null
  return { clientId, clientSecret }
}

async function getToken(c: Credentials): Promise<string> {
  const res = await fetch(`${AMADEUS_BASE}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: c.clientId,
      client_secret: c.clientSecret,
    }),
  })
  const data = await res.json()
  if (!res.ok || !data.access_token) throw new Error(data.error_description || 'Amadeus token 获取失败')
  return data.access_token
}

export interface PriceOffer {
  itemType: string
  itemName: string
  source: string
  price: number
  currency: string
}

export async function searchFlightOffers(params: {
  origin: string
  destination: string
  date: string
  adults: number
}): Promise<PriceOffer[] | null> {
  const c = getCredentials()
  if (!c) return null // 未配置 → 调用方降级

  try {
    const token = await getToken(c)
    const qs = new URLSearchParams({
      originLocationCode: params.origin,
      destinationLocationCode: params.destination,
      departureDate: params.date,
      adults: String(params.adults),
      max: '3',
      currencyCode: 'AUD',
    })
    const res = await fetch(`${AMADEUS_BASE}/v2/shopping/flight-offers?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return null
    const data = await res.json()
    return (data.data || []).map((o: any) => ({
      itemType: 'flight',
      itemName: `${params.origin}→${params.destination}`,
      source: 'amadeus',
      price: parseFloat(o.price?.grandTotal || '0'),
      currency: o.price?.currency || 'AUD',
    }))
  } catch (e) {
    console.error('Amadeus flight search failed:', e)
    return null
  }
}
