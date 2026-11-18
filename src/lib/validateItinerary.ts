// 路线可行性检查：基于坐标距离估算驾驶时长 + 每日地点数量，给出精简建议。

export interface DayCoord {
  name: string
  slug: string
  coordinates: [number, number] // [lng, lat]
}

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, '')
}

function haversineKm(a: [number, number], b: [number, number]): number {
  const [lng1, lat1] = a
  const [lng2, lat2] = b
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

export function validateItinerary(days: any[], destinations: DayCoord[]): string[] {
  const warnings: string[] = []
  const coordByName = new Map<string, [number, number]>()
  for (const d of destinations) {
    coordByName.set(norm(d.name), d.coordinates)
    coordByName.set(norm(d.slug), d.coordinates)
  }

  for (const day of days) {
    const locs: string[] = Array.isArray(day.locations) ? day.locations : []
    if (locs.length > 3) {
      warnings.push(`Day ${day.day} 安排了 ${locs.length} 个地点，可能偏赶，建议精简`)
    }

    let drivingKm = 0
    for (let i = 0; i < locs.length - 1; i++) {
      const a = coordByName.get(norm(locs[i]))
      const b = coordByName.get(norm(locs[i + 1]))
      if (a && b) drivingKm += haversineKm(a, b)
    }
    const drivingHours = drivingKm / 60 // 粗估平均 60km/h
    if (drivingHours > 4) {
      warnings.push(`Day ${day.day} 驾驶约 ${Math.round(drivingHours)}h，超过 4 小时建议删除一个景点`)
    } else if (drivingHours > 2.5) {
      warnings.push(`Day ${day.day} 驾驶约 ${Math.round(drivingHours)}h，注意节奏`)
    }
  }

  return warnings
}
