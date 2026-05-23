import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import MobileNav from '@/components/MobileNav'

export const metadata: Metadata = {
  title: 'NZ Trail — 新西兰旅行计划',
  description: '探索新西兰，告别规划焦虑。AI 智能生成专属路线，覆盖南北岛，几分钟搞定行程',
  openGraph: {
    title: 'NZ Trail — 新西兰旅行计划',
    description: '探索新西兰，告别规划焦虑。AI 智能生成专属路线，覆盖南北岛，几分钟搞定行程',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NZ Trail — 新西兰旅行计划',
    description: '探索新西兰，告别规划焦虑。AI 智能生成专属路线，覆盖南北岛，几分钟搞定行程',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-border">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-surface-fg tracking-tight">
              NZ<span className="text-brand-500">Trail</span>
            </Link>
            <nav className="flex gap-4 text-sm text-surface-fg/60">
              <Link href="/" className="hover:text-surface-fg transition-colors">首页</Link>
              <Link href="/my-plans" className="hover:text-surface-fg transition-colors">我的计划</Link>
              <Link href="/about" className="hover:text-surface-fg transition-colors">关于</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <MobileNav />
      </body>
    </html>
  )
}
