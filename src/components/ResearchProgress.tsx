'use client'

import { useState, useEffect } from 'react'

const STEPS = [
  '正在搜索当地热门景点',
  '正在分析游客旅行经验',
  '正在整理推荐餐厅',
  '正在比较住宿价格',
  '正在生成 3 个专属旅行方案',
]

export default function ResearchProgress() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setStep(s => (s < STEPS.length - 1 ? s + 1 : s))
    }, 900)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
      <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <span className="animate-pulse">🤖</span> AI 正在为你研究行程…
      </div>
      <ul className="space-y-1.5">
        {STEPS.map((s, i) => (
          <li
            key={i}
            className={`text-xs flex items-center gap-2 transition-colors ${
              i <= step ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            <span className="w-4 text-center">{i < step ? '✅' : i === step ? '⏳' : '○'}</span>
            {s}
          </li>
        ))}
      </ul>
      <div className="text-[10px] text-gray-400">正在综合攻略来源与你的偏好，预计还需几秒…</div>
    </div>
  )
}
