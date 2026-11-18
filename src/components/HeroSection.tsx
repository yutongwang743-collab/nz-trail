'use client'

import { useRouter } from 'next/navigation'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HeroSection() {
  const router = useRouter()
  return (
    <section className="relative min-h-[420px] md:min-h-[540px] flex items-center justify-center overflow-hidden">
      {/* 大图背景 */}
      <img
        src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&h=1080&fit=crop&auto=format"
        alt="旅行风景"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 暗色遮罩保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />

      {/* 内容 */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4 py-16 md:py-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI 旅行规划
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          你的下一段旅程
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">
            交给 AI 规划
          </span>
        </h1>

        <p className="mt-5 text-base md:text-lg text-white/70 max-w-md mx-auto leading-relaxed">
          告诉我们你想去哪，我们帮你研究攻略、比较价格、生成专属旅行方案。
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              router.push('/?wizard=1', { scroll: false })
              requestAnimationFrame(() => {
                requestAnimationFrame(() => scrollTo('wizard-section'))
              })
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold text-sm shadow-lg shadow-black/20 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            开始规划
          </button>
          <button
            onClick={() => scrollTo('routes-section')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            探索目的地
          </button>
        </div>

        {/* 信任条 */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-white/50 text-xs">
          <span>覆盖澳洲与新西兰</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
          <span>AI 智能推荐</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
          <span>真实路线验证</span>
        </div>
      </div>
    </section>
  )
}
