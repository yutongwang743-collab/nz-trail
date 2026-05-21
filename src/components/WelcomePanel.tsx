'use client'

import { useEffect, useState } from 'react'

interface WelcomePanelProps {
  onStart: () => void
  onSkip: () => void
}

export default function WelcomePanel({ onStart, onSkip }: WelcomePanelProps) {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  function handleSkip() {
    setExiting(true)
    setTimeout(onSkip, 300)
  }

  function handleStart() {
    setExiting(true)
    setTimeout(onStart, 300)
  }

  if (!visible && !exiting) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20" onClick={handleSkip}>
      <div
        onClick={e => e.stopPropagation()}
        className={`w-full max-w-lg bg-white rounded-t-3xl p-6 shadow-2xl transition-all duration-300 ${
          exiting ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        } motion-reduce:transition-none`}
      >
        <div className="text-center space-y-4">
          <div className="text-5xl">🗺️</div>
          <h2 className="text-xl font-bold text-gray-900">找到属于你的新西兰路线</h2>
          <p className="text-sm text-gray-500">回答几个简单问题，帮你匹配最合适的旅行方案</p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSkip}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
            >
              跳过，自己看
            </button>
            <button
              onClick={handleStart}
              className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              开始发现
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
