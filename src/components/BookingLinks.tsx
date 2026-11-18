// ── 联盟/佣金参数占位（申请后填入即可生效）──
// Booking.com Affiliate (AAPP)：填 aid，用户下单自动记佣金
const BOOKING_AID = '' // 例：'1234567'
// Agoda affiliate：填 cid
const AGODA_CID = '' // 例：'1234567'

interface BookingLinksProps {
  country: string
  region: string
  checkin?: string // 'YYYY-MM-DD'，可选；未来向导收集出行日期后可传入
  checkout?: string
  adults?: number
}

// 按目的地生成订票/比价深链（携程 vs 外网），带联盟参数与可选日期
export default function BookingLinks({ country, region, checkin, checkout, adults = 2 }: BookingLinksProps) {
  const q = encodeURIComponent(region)

  const bookingParams = new URLSearchParams({ ss: region, group_adults: String(adults) })
  if (checkin) bookingParams.set('checkin', checkin)
  if (checkout) bookingParams.set('checkout', checkout)
  if (BOOKING_AID) bookingParams.set('aid', BOOKING_AID)

  const agodaParams = new URLSearchParams({ city: region })
  if (AGODA_CID) agodaParams.set('cid', AGODA_CID)

  const links: { name: string; desc: string; url: string }[] = [
    { name: '携程', desc: '机票+酒店（中文）', url: 'https://www.ctrip.com/' },
    { name: 'Skyscanner', desc: '机票全网比价', url: 'https://www.skyscanner.net/' },
    { name: 'Booking.com', desc: '住宿比价', url: `https://www.booking.com/searchresults.zh-cn.html?${bookingParams.toString()}` },
    { name: 'Agoda', desc: '住宿比价', url: `https://www.agoda.com/zh-cn/search?${agodaParams.toString()}` },
  ]

  if (country === '澳大利亚') {
    links.push({ name: 'Jetstar', desc: '澳洲廉航', url: 'https://www.jetstar.com/au/en/home' })
    links.push({ name: 'Qantas', desc: '澳洲航空', url: 'https://www.qantas.com/au/en.html' })
  } else {
    links.push({ name: 'Air NZ', desc: '新西兰航空', url: 'https://www.airnewzealand.co.nz/' })
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-semibold text-gray-900">📌 订票比价参考</h2>
        <span className="text-xs text-gray-400">以「{region}」为目的地，携程 vs 外网多比价</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {links.map(l => (
          <a
            key={l.name}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-sm transition"
          >
            <div className="text-sm font-semibold text-gray-800">{l.name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{l.desc}</div>
          </a>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-3">
        ℹ️ 部分为联盟链接，通过它们预订不影响你的价格；申请 affiliate 后填入 aid/cid 即可自动记佣金。
      </p>
    </div>
  )
}
