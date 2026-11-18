'use client'

import { useState } from 'react'

export default function SubmitPostCard({ onSubmitted }: { onSubmitted?: () => void }) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const submit = async () => {
    if (!content.trim() && !title.trim()) return
    setSubmitting(true)
    setMsg(null)
    try {
      const res = await fetch('/api/submit-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceUrl: url.trim(), title, content }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || '提交失败')
      setMsg('✅ 已保存，AI 已提取要点')
      setUrl(''); setTitle(''); setContent('')
      onSubmitted?.()
    } catch (e: any) {
      setMsg('❌ ' + (e?.message || '提交失败'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="card p-4">
      <button onClick={() => setOpen(!open)} className="w-full text-left flex items-center justify-between">
        <span className="font-semibold text-gray-900">💾 存下你喜欢的帖子</span>
        <span className="text-xs text-gray-400">{open ? '收起 ▲' : '展开 ▼'}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-gray-400">
            小红书/抖音爬不到时，把你读到的喜欢的帖子粘贴进来，AI 会提取要点并融入推荐。
          </p>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="帖子链接（可选）"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="标题"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="帖子内容（粘贴正文）"
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button
            onClick={submit}
            disabled={submitting || (!content.trim() && !title.trim())}
            className="w-full py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition"
          >
            {submitting ? '保存中…' : '保存并 AI 提取'}
          </button>
          {msg && <div className="text-xs text-green-600">{msg}</div>}
        </div>
      )}
    </div>
  )
}
