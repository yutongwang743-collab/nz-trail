// Google Maps Directions 客户端：精确驾驶时长，用于可行性检查。
// 未配置 GOOGLE_MAPS_API_KEY 时返回 null（调用方降级为 haversine 估算）。

export interface LatLng {
  lat: number
  lng: number
}

export async function getDrivingMinutes(origin: LatLng, dest: LatLng): Promise<number | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY
  if (!key) return null

  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${dest.lat},${dest.lng}&key=${key}`
    const res = await fetch(url)
    const data = await res.json()
    if (data.status !== 'OK') return null
    const seconds = data.routes?.[0]?.legs?.[0]?.duration?.value
    return seconds ? Math.round(seconds / 60) : null
  } catch (e) {
    console.error('Google Maps directions failed:', e)
    return null
  }
}
