'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, Compass } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', label: '首页', Icon: Home },
  { href: '/my-plans', label: '我的计划', Icon: Heart },
  { href: '/about', label: '关于', Icon: Compass },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-surface-border safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href
          const { Icon } = item
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[64px] transition-colors ${
                isActive ? 'text-brand-500' : 'text-surface-fg/50 hover:text-surface-fg/70'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
