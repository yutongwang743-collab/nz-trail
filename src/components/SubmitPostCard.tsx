'use client'

import { useState } from 'react'

export default function SubmitPostCard({ onSubmitted }: { onSubmitted?: () => void }) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const submit = async () => {
    if (!url.trim()) return
    setSubmitting(true)
    setMsg(null)
    try {
      const res = await fetch('/api/submit-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || '提交失败')
      if (json.fetched) {
        setMsg('✅ 已保存并自动提取')
        setUrl('')
        setOpen(false)
        onSubmitted?.()
      } else {
        setMsg('⚠️ 已保存链接，但内容无法自动抓取（可能需要登录或有反爬），仅保留链接')
        setUrl('')
        setOpen(false)
        onSubmitted?.()
      }
    } catch (e: any) {
      setMsg('❌ ' + (e?.message || '提交失败'))
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50/30 transition"
      >
        <span className="text-3xl leading-none">＋</span>
        <span className="text-xs">存下你喜欢的帖子</span>
      </button>
    )
  }

  return (
    <div className="card p-4">
      <div className="text-sm font-medium text-gray-700 mb-2">请复制链接到这里</div>
      <input
        autoFocus
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') submit() }}
        placeholder="粘贴帖子链接，如 https://…"
        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      {msg && <div className="text-xs text-green-600 mt-1.5">{msg}</div>}
      <div className="flex gap-2 mt-3">
        <button
          onClick={submit}
          disabled={submitting || !url.trim()}
          className="flex-1 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition"
        >
          {submitting ? '提取中…' : '自动提取'}
        </button>
        <button
          onClick={() => { setOpen(false); setUrl(''); setMsg(null) }}
          className="px-4 py-2 rounded-lg border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition"
        >
          取消
        </button>
      </div>
    </div>
  )
}
