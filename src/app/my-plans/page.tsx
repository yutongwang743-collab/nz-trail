'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSavedPlans, removePlan, type SavedPlan } from '@/lib/savedPlans'
import { getAIHistory, removeAIHistory, type AIHistoryEntry } from '@/lib/aiHistory'

export default function MyPlansPage() {
  const [plans, setPlans] = useState<SavedPlan[]>([])
  const [history, setHistory] = useState<AIHistoryEntry[]>([])
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<'history' | 'saved'>('history')

  useEffect(() => {
    setPlans(getSavedPlans())
    setHistory(getAIHistory())
    setMounted(true)
  }, [])

  const handleRemovePlan = (id: string) => {
    removePlan(id)
    setPlans(prev => prev.filter(p => p.id !== id))
  }

  const handleRemoveHistory = (id: string) => {
    removeAIHistory(id)
    setHistory(prev => prev.filter(h => h.id !== id))
  }

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">我的计划</h1>
        <div className="text-center py-20 text-gray-400">加载中...</div>
      </div>
    )
  }

  const hasContent = history.length > 0 || plans.length > 0

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">我的计划</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === 'history'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🤖 历史创建 ({history.length})
        </button>
        <button
          onClick={() => setTab('saved')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            tab === 'saved'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          ❤️ 已收藏 ({plans.length})
        </button>
      </div>

      {!hasContent && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="text-gray-400 mb-4">还没有任何计划</p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            ← 去发现路线
          </Link>
        </div>
      )}

      {/* AI History Tab */}
      {tab === 'history' && (
        <>
          {history.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🤖</p>
              <p>还没有 AI 生成的行程</p>
              <p className="text-xs mt-1">去首页完成问卷，试试 AI 智能生成</p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2 mt-4">
                ← 去首页
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map(entry => (
                <div key={entry.id} className="card p-4 hover:shadow-soft-md transition group border-emerald-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      🤖 AI 生成
                    </span>
                    <span className="text-xs text-gray-400">{entry.region}</span>
                    <button
                      onClick={() => handleRemoveHistory(entry.id)}
                      className="ml-auto text-xs text-gray-400 hover:text-red-500 transition"
                      title="删除"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-500 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{entry.description}</p>

                  <Link
                    href={`/ai-plans/${entry.id}`}
                    className="block w-full text-center py-2 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-medium hover:bg-emerald-100 transition"
                  >
                    查看 AI 行程
                  </Link>

                  <div className="text-[10px] text-gray-400 mt-2">
                    创建于 {new Date(entry.createdAt).toLocaleDateString('zh-CN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Saved Tab */}
      {tab === 'saved' && (
        <>
          {plans.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">❤️</p>
              <p>还没有收藏任何路线</p>
              <p className="text-xs mt-1">浏览路线时点击收藏按钮即可保存</p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2 mt-4">
                ← 去发现路线
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map(plan => (
                <div key={plan.id} className="card p-4 hover:shadow-soft-md transition group">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      plan.type === 'ai'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-brand-50 text-brand-600'
                    }`}>
                      {plan.type === 'ai' ? '🤖 AI 生成' : '📋 已有路线'}
                    </span>
                    <span className="text-xs text-gray-400">{plan.region}</span>
                    <button
                      onClick={() => handleRemovePlan(plan.id)}
                      className="ml-auto text-xs text-gray-400 hover:text-red-500 transition"
                      title="取消收藏"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-brand-500 transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{plan.description}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    {plan.variantDuration && <span>📅 {plan.variantDuration}</span>}
                    {plan.variantBudget && <span>💰 {plan.variantBudget}</span>}
                  </div>

                  {plan.type === 'route' && plan.routeSlug ? (
                    <Link
                      href={`/routes/${plan.routeSlug}`}
                      className="block w-full text-center py-2 rounded-xl bg-brand-50 text-brand-600 text-sm font-medium hover:bg-brand-100 transition"
                    >
                      查看路线详情
                    </Link>
                  ) : plan.type === 'ai' && plan.aiData ? (
                    <Link
                      href={`/ai-plans/${plan.id}`}
                      className="block w-full text-center py-2 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-medium hover:bg-emerald-100 transition"
                    >
                      查看 AI 行程
                    </Link>
                  ) : null}

                  <div className="text-[10px] text-gray-400 mt-2">
                    收藏于 {new Date(plan.savedAt).toLocaleDateString('zh-CN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
