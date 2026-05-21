'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { DayDiff } from '@/lib/diffVariants'

interface ItineraryDay {
  day: number
  locations: string[]
  activities: string[]
  transport: string
  meals: string
  accommodation: string
  morningNote?: string
  afternoonNote?: string
  eveningNote?: string
  weatherTip?: string
  highlightDesc?: string
  highlightQuote?: { text: string; author: string }
  coverImage?: string
  photoSpots?: { name: string; tip: string; image: string }[]
  restaurants?: { name: string; dish: string; price: string; tip: string; image: string }[]
}

interface DestinationCoord {
  name: string
  slug: string
  coordinates: [number, number]
  image: string
  description: string
}

interface RelatedPost {
  id: number
  title: string
  authorName: string
  likes: number
  saves: number
  comments: number
  sourcePlatform: string
  sourceUrl: string
  aiLocations: string[]
}

interface MapTimelineProps {
  itinerary: ItineraryDay[]
  destinationCoords: DestinationCoord[]
  diffMap?: Map<number, DayDiff>
  relatedPosts?: RelatedPost[]
}

const NZ_CENTER: [number, number] = [172.6, -43.5]

// Resolve "queenstown" → DestinationCoord even if case/format varies
function findDest(destinations: DestinationCoord[], locationName: string): DestinationCoord | undefined {
  const normalized = locationName.toLowerCase().replace(/[^a-z]/g, '')
  return destinations.find(d => d.slug === normalized)
}

export default function MapTimeline({ itinerary, destinationCoords, diffMap, relatedPosts }: MapTimelineProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const [activeDay, setActiveDay] = useState<number | null>(null)
  const [mapReady, setMapReady] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        },
        layers: [{ id: 'osm-layer', type: 'raster', source: 'osm' }],
      },
      center: destinationCoords[0]?.coordinates ?? NZ_CENTER,
      zoom: 7,
    })

    m.on('load', () => setMapReady(true))
    m.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.current = m

    return () => {
      m.remove()
      map.current = null
      setMapReady(false)
    }
  }, [])

  // Add markers and route line
  useEffect(() => {
    if (!map.current || !mapReady || destinationCoords.length === 0) return

    const m = map.current
    markersRef.current.forEach(mr => mr.remove())
    markersRef.current = []

    const coords = destinationCoords.map(d => d.coordinates)

    const geojson: GeoJSON.Feature = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: coords },
    }

    if (m.getSource('route-line')) {
      ;(m.getSource('route-line') as maplibregl.GeoJSONSource).setData(geojson)
    } else {
      m.addSource('route-line', { type: 'geojson', data: geojson })
      m.addLayer({
        id: 'route-line-layer',
        type: 'line',
        source: 'route-line',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#e51d1d', 'line-width': 3, 'line-opacity': 0.7 },
      })
    }

    destinationCoords.forEach((dest, i) => {
      const el = document.createElement('div')
      el.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer border-2 border-white'
      el.style.backgroundColor = '#e51d1d'
      el.style.color = 'white'
      el.textContent = String(i + 1)
      el.title = dest.name

      const popup = new maplibregl.Popup({ offset: 25, maxWidth: '300px' }).setHTML(
        `<div style="padding:16px">
          <img src="${dest.image}" alt="${dest.name}" style="width:100%;height:90px;object-fit:cover;border-radius:8px;margin-bottom:8px" loading="lazy" />
          <div style="font-weight:600;font-size:14px">${dest.name}</div>
          <div style="font-size:12px;color:#666;margin-top:4px">${dest.description}</div>
        </div>`
      )

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(dest.coordinates)
        .setPopup(popup)
        .addTo(m)

      el.addEventListener('click', () => {
        setActiveDay(i)
        m.flyTo({ center: dest.coordinates, zoom: 10, duration: 800 })
      })

      markersRef.current.push(marker)
    })

    const bounds = new maplibregl.LngLatBounds()
    coords.forEach(c => bounds.extend(c))
    if (!bounds.isEmpty()) {
      m.fitBounds(bounds, { padding: 60, maxZoom: 10 })
    }
  }, [mapReady, destinationCoords])

  const flyToDay = useCallback((index: number) => {
    setActiveDay(prev => prev === index ? null : index)
    const coord = destinationCoords[index]?.coordinates
    if (coord && map.current) {
      map.current.flyTo({ center: coord, zoom: 10, duration: 800 })
    }
  }, [destinationCoords])

  return (
    <div className="space-y-6">
      {/* Map */}
      <div className="relative">
        <div ref={mapContainer} className="w-full h-[40vh] sm:h-[50vh] rounded-2xl overflow-hidden border border-gray-200" />
        {!mapReady && (
          <div className="absolute inset-0 rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            加载地图中...
          </div>
        )}
      </div>

      {/* Timeline with expandable image galleries */}
      <div className="space-y-4">
        {itinerary.map((day, i) => {
          const isActive = activeDay === i
          const diff = diffMap?.get(i)
          const dayDests = day.locations
            .map(loc => findDest(destinationCoords, loc))
            .filter(Boolean) as DestinationCoord[]

          return (
            <div
              key={i}
              id={`day-${i}`}
              className={`relative pl-8 border-l-2 transition ${
                isActive ? 'border-brand-500' : 'border-gray-200'
              } last:pb-0`}
            >
              {/* Day dot */}
              <button
                onClick={() => flyToDay(i)}
                className={`absolute left-0 top-0 -translate-x-1/2 w-5 h-5 rounded-full border-2 transition cursor-pointer ${
                  isActive ? 'bg-brand-500 border-brand-500 scale-125' : 'bg-white border-gray-300 hover:border-brand-400'
                }`}
              />

              <div className={isActive ? '' : 'pb-6'}>
                {/* Day header — always visible, always shows schedule */}
                <button
                  onClick={() => flyToDay(i)}
                  className={`w-full text-left p-4 rounded-2xl transition ${
                    isActive ? 'bg-brand-50 border border-brand-100 shadow-sm' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-brand-500 bg-brand-100 px-2 py-0.5 rounded-full">
                      Day {day.day}
                    </span>
                    <span className="text-sm font-semibold text-surface-fg">
                      {day.locations.join(' → ')}
                    </span>
                    <span className="ml-auto text-xs text-surface-fg/40">
                      {isActive ? '收起 ▲' : '展开 ▼'}
                    </span>
                  </div>

                  {/* Time-of-day itinerary structure */}
                  <div className="space-y-2.5 text-sm">
                    <div className="flex gap-3">
                      <div className="shrink-0 flex items-center gap-1 text-xs font-medium text-amber-600 min-w-[72px]">
                        <span>🌅</span> 上午
                      </div>
                      <div className="text-surface-fg/70">
                        {day.morningNote || day.activities.slice(0, Math.ceil(day.activities.length / 2)).join(' · ')}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="shrink-0 flex items-center gap-1 text-xs font-medium text-sky-600 min-w-[72px]">
                        <span>☀️</span> 下午
                      </div>
                      <div className="text-surface-fg/70">
                        {day.afternoonNote || day.activities.slice(Math.ceil(day.activities.length / 2)).join(' · ')}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="shrink-0 flex items-center gap-1 text-xs font-medium text-indigo-600 min-w-[72px]">
                        <span>🌙</span> 傍晚
                      </div>
                      <div className="text-surface-fg/70">
                        <span className={diff?.mealsChanged ? 'bg-amber-50 text-amber-700 rounded px-1 -mx-1' : ''}>
                          {day.meals}
                        </span>
                        {day.accommodation && (
                          <>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className={diff?.accommodationChanged ? 'bg-green-50 text-green-700 rounded px-1 -mx-1' : ''}>
                              {day.accommodation}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Transport + weather tip */}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {day.transport && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-muted text-surface-fg/60 ${diff?.transportChanged ? '!bg-amber-50 !text-amber-700' : ''}`}>
                        <span>🚗</span> {day.transport}
                      </span>
                    )}
                    {day.weatherTip && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                        <span>🌤️</span> {day.weatherTip}
                      </span>
                    )}
                  </div>

                  {/* Compact highlight + quote (subtle inline) */}
                  {day.highlightDesc && (
                    <div className="mt-3 pt-3 border-t border-gray-200/60">
                      <p className="text-xs text-surface-fg/60 leading-relaxed line-clamp-2">
                        {day.highlightDesc}
                      </p>
                      {day.highlightQuote && (
                        <p className="text-xs text-rose-500/70 mt-1.5 italic line-clamp-1">
                          💬 "{day.highlightQuote.text.slice(0, 60)}{day.highlightQuote.text.length > 60 ? '...' : ''}"
                          <span className="text-rose-400/50 not-italic ml-1">—— {day.highlightQuote.author}</span>
                        </p>
                      )}
                    </div>
                  )}
                </button>

                {/* Expanded: Destination-specific post reviews */}
                {isActive && relatedPosts && relatedPosts.length > 0 && (() => {
                  const dayLocationSlugs = day.locations.map(l => l.toLowerCase().replace(/[^a-z]/g, ''))
                  const matchingPosts = relatedPosts.filter(p =>
                    p.aiLocations.some(loc => dayLocationSlugs.some(slug =>
                      loc.includes(slug) || slug.includes(loc.toLowerCase().replace(/[^a-z]/g, ''))
                    ))
                  ).slice(0, 6)

                  if (matchingPosts.length === 0) return null

                  return (
                    <div className="mt-3 animate-[fadeIn_0.3s_ease] px-1">
                      <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                        <span>📱</span> {day.locations[0]} 真实评价 · {matchingPosts.length} 篇相关
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {matchingPosts.map((post, pi) => (
                          <a
                            key={pi}
                            href={`/posts/${post.id}`}
                            className="shrink-0 w-[200px] p-3 rounded-xl bg-white border border-gray-100 hover:border-brand-200 hover:shadow-soft-md transition group"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                {post.authorName[0]}
                              </div>
                              <span className="text-xs font-medium text-surface-fg truncate">{post.authorName}</span>
                            </div>
                            <p className="text-xs text-surface-fg/70 line-clamp-3 leading-relaxed group-hover:text-brand-500 transition-colors">
                              {post.title}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-[10px] text-surface-fg/40">
                              <span>❤️ {post.likes}</span>
                              <span>💬 {post.comments}</span>
                              <span className="ml-auto">{post.sourcePlatform}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                })()}

                {/* Restaurant cards (only if no matching posts to avoid clutter) */}
                {isActive && day.restaurants && day.restaurants.length > 0 && (
                  <div className="mt-3 animate-[fadeIn_0.3s_ease]">
                    <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                      <span>🍽️</span> 必打卡餐厅
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {day.restaurants.map((r, ri) => (
                        <div key={ri} className="shrink-0 w-[160px] rounded-lg overflow-hidden border border-gray-100 bg-white">
                          <img src={r.image} alt={r.name} className="w-full h-24 object-cover" loading="lazy" />
                          <div className="p-2">
                            <div className="text-xs font-semibold text-gray-800 truncate">{r.name}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5">{r.dish} · {r.price}</div>
                            <div className="text-[10px] text-amber-600 mt-1 line-clamp-2">💡 {r.tip}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photo spot cards */}
                {isActive && day.photoSpots && day.photoSpots.length > 0 && (
                  <div className="mt-3 animate-[fadeIn_0.3s_ease]">
                    <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                      <span>📸</span> 最佳拍照点位
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {day.photoSpots.map((ps, pi) => (
                        <div key={pi} className="shrink-0 w-[160px] rounded-lg overflow-hidden border border-gray-100 bg-white">
                          <img src={ps.image} alt={ps.name} className="w-full h-24 object-cover" loading="lazy" />
                          <div className="p-2">
                            <div className="text-xs font-semibold text-gray-800 truncate">{ps.name}</div>
                            <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">{ps.tip}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
