// NZ location → image URL mapping (Unsplash direct URLs, permanent)
// Format: https://images.unsplash.com/photo-{ID}?w={width}&h={height}&fit=crop&auto=format

const UNSPLASH_BASE = 'https://images.unsplash.com'

interface ImageEntry {
  id: string    // Unsplash photo ID
  credit: string
}

const IMAGE_MAP: Record<string, ImageEntry> = {
  // ── South Island ──
  queenstown:     { id: 'photo-1597047084897-51e81819a599', credit: 'Queenstown lake and mountains' },
  glenorchy:      { id: 'photo-1507699622108-4be3abd695ad', credit: 'Glenorchy jetty' },
  arrowtown:      { id: 'photo-1602038326447-25cdd8dbc625', credit: 'Arrowtown autumn' },
  wanaka:         { id: 'photo-1518173946686-32b5c4d0aa23', credit: 'Wanaka tree' },
  'milford sound': { id: 'photo-1596811217660-1fc34e6a0bf8', credit: 'Milford Sound' },
  'te anau':      { id: 'photo-1624674728689-8e6e18c39e33', credit: 'Te Anau' },
  christchurch:   { id: 'photo-1589794026306-3d28f17d4b33', credit: 'Christchurch' },
  'lake tekapo':  { id: 'photo-1506680818543-994689b29a07', credit: 'Lake Tekapo lupins' },
  'mount cook':   { id: 'photo-1469521669194-e0b684b27a1f', credit: 'Aoraki Mount Cook' },
  'lake pukaki':  { id: 'photo-1602587913504-42fb7b5aac6b', credit: 'Lake Pukaki' },
  dunedin:        { id: 'photo-1566334076435-f7ef076a3d16', credit: 'Dunedin railway' },
  nelson:         { id: 'photo-1572401899098-ea42205cee7a', credit: 'Abel Tasman' },
  kaikoura:       { id: 'photo-1507038643994-5f62bee6b5e8', credit: 'Kaikoura coast' },
  'fox glacier':  { id: 'photo-1506268919520-8c6e8e20ccfe', credit: 'Fox Glacier' },
  'franz josef':  { id: 'photo-1578996951392-c26091a12b36', credit: 'Franz Josef Glacier' },

  // ── North Island ──
  auckland:       { id: 'photo-1506744031547-1c306b50f57e', credit: 'Auckland skyline' },
  rotorua:        { id: 'photo-1563770542592-0be5d3e78c27', credit: 'Rotorua thermal' },
  wellington:     { id: 'photo-1589873543697-76b74c7548e7', credit: 'Wellington' },
  taupo:          { id: 'photo-1592864054388-b3aa5ef97464', credit: 'Lake Taupo' },
  hobbiton:       { id: 'photo-1510005036624-a0562a7695ac', credit: 'Hobbiton' },
  napier:         { id: 'photo-1576126539421-164dabff0369', credit: 'Napier Art Deco' },
  'bay of islands': { id: 'photo-1552614241-2b1e50e3b17b', credit: 'Bay of Islands' },

  // ── Specific spots ──
  'crown range':     { id: 'photo-1508193638397-1c4234db14d8', credit: 'Crown Range road' },
  'lindis pass':     { id: 'photo-1469854523086-cc02fe5d8800', credit: 'Lindis Pass' },
  'mirror lakes':    { id: 'photo-1501785888041-af3ef285b470', credit: 'Mirror Lakes' },
  'hooker valley':   { id: 'photo-1585403490483-aa96cd2600de', credit: 'Hooker Valley track' },
  'paradise road':   { id: 'photo-1500534623283-821caa24799c', credit: 'Paradise Road Glenorchy' },
}

// Normalize location name for lookup
function norm(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, '')
}

export function getLocationImage(name: string, w = 800, h = 500): { url: string; credit: string } {
  const entry = IMAGE_MAP[norm(name)]
  if (entry) {
    return {
      url: `${UNSPLASH_BASE}/${entry.id}?w=${w}&h=${h}&fit=crop&auto=format`,
      credit: entry.credit,
    }
  }
  // Fallback: broad NZ landscape
  return {
    url: `${UNSPLASH_BASE}/photo-1507699622108-4be3abd695ad?w=${w}&h=${h}&fit=crop&auto=format`,
    credit: 'New Zealand landscape',
  }
}

export function getAllLocationNames(): string[] {
  return Object.keys(IMAGE_MAP)
}
