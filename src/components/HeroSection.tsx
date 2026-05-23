'use client'

import { useRouter } from 'next/navigation'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HeroSection() {
  const router = useRouter()
  return (
    <section className="relative min-h-[420px] md:min-h-[480px] flex items-center justify-center overflow-hidden -mx-4 px-4">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Deep forest green gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,#1a3a2a_0%,transparent_70%)]" />
        {/* Teal mid-layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_60%,#0d9488_0%,transparent_60%)]" />
        {/* Sky blue wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_80%,#0ea5e9_0%,transparent_50%)]" />
        {/* Earth tone warm base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,#78716c_0%,transparent_50%)]" />
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-gray-900/60" />
      </div>

      {/* Subtle geometric texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto py-16 md:py-20">
        {/* Pre-headline badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI-Powered Travel Planning
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
          探索新西兰
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-300 to-amber-200">
            告别规划焦虑
          </span>
        </h1>

        <p className="mt-5 text-base md:text-lg text-white/65 max-w-md mx-auto leading-relaxed">
          不用翻遍攻略、不用对比价格。告诉我们你的偏好，
          几分钟内获得一条完整的新西兰旅行路线。
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              router.push('/?wizard=1', { scroll: false })
              setTimeout(() => scrollTo('wizard-section'), 300)
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold text-sm shadow-lg shadow-black/20 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            开始规划
          </button>
          <button
            onClick={() => scrollTo('routes-section')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm hover:bg-white/15 hover:border-white/30 transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
            探索路线
          </button>
        </div>

        {/* Trust bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-white/45 text-xs">
          <span>覆盖南北岛</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
          <span>AI 智能推荐</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
          <span>免费使用</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
          <span>真实路线验证</span>
        </div>
      </div>
    </section>
  )
}
