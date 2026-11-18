'use client'

import { useState, useEffect } from 'react'
import AdminLogin from '@/components/AdminLogin'

interface Post {
  id: number
  title: string
  authorName: string
  sourcePlatform: string
  status: string
  likes: number
  crawledAt: string
  route?: { title: string } | null
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [importText, setImportText] = useState('')
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify' }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) setAuthed(true)
        setLoading(false)
      })
  }, [])

  async function handleLogin(password: string) {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', password }),
    })
    const data = await res.json()
    if (data.ok) { setAuthed(true); return true }
    return false
  }

  async function loadPosts() {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'list_posts' }),
    })
    const data = await res.json()
    setPosts(data.posts)
  }

  async function updatePost(id: number, status: string) {
    await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_post', id, status }),
    })
    loadPosts()
  }

  async function handleImport() {
    if (!importText.trim()) return
    setImporting(true)
    setImportResult(null)
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'batch_import', rawText: importText }),
    })
    const data = await res.json()
    setImporting(false)
    if (data.ok) {
      setImportResult(`成功导入 ${data.imported} 篇帖子`)
      setImportText('')
      loadPosts()
    } else {
      setImportResult(`失败: ${data.error}`)
    }
  }

  useEffect(() => {
    if (authed) loadPosts()
  }, [authed])

  if (loading) return <div className="text-center py-20 text-gray-400">加载中...</div>
  if (!authed) return <AdminLogin onLogin={handleLogin} />

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">内容管理</h1>

      {/* 批量导入 */}
      <div className="card p-5 mb-8 border-brand-100 bg-brand-50/30">
        <h2 className="font-semibold text-gray-900 mb-2">📥 批量导入帖子</h2>
        <p className="text-xs text-gray-500 mb-4">
          粘贴小红书帖子内容，每篇格式：<br/>
          <code className="text-[11px] bg-white px-1 py-0.5 rounded">帖子链接（可选）<br/>标题<br/>正文内容<br/>---</code><br/>
          多篇用 <code className="text-[11px] bg-white px-1 py-0.5 rounded">---</code> 分隔，AI 自动提取地点/活动/预算等
        </p>
        <textarea
          value={importText}
          onChange={e => setImportText(e.target.value)}
          placeholder={`https://www.xiaohongshu.com/xxx\n皇后镇3天真的够！\n从悉尼飞皇后镇只要3小时...\n---\nhttps://www.xiaohongshu.com/yyy\nTekapo星空攻略\n堪培拉出发基督城往返...`}
          rows={10}
          className="w-full rounded-xl border border-gray-200 p-4 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand-200"
          disabled={importing}
        />
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleImport}
            disabled={importing || !importText.trim()}
            className="btn-primary disabled:opacity-50"
          >
            {importing ? '导入中...' : '🤖 AI 提取并导入'}
          </button>
          {importResult && (
            <span className={`text-sm ${importResult.startsWith('成功') ? 'text-green-600' : 'text-red-500'}`}>
              {importResult}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {posts.map(post => (
          <div key={post.id} className="card p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 truncate">{post.title}</div>
              <div className="text-xs text-gray-400 mt-1">
                {post.authorName} · {post.sourcePlatform} · {post.route?.title || '未关联路线'} · {new Date(post.crawledAt).toLocaleDateString('zh-CN')}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-xs px-2 py-1 rounded-full ${
                post.status === 'auto_published' ? 'bg-green-100 text-green-700' :
                post.status === 'flagged' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {post.status}
              </span>
              {post.status !== 'deleted' && (
                <button
                  onClick={() => updatePost(post.id, 'deleted')}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1"
                >
                  删除
                </button>
              )}
              {post.status === 'deleted' && (
                <button
                  onClick={() => updatePost(post.id, 'auto_published')}
                  className="text-xs text-green-500 hover:text-green-700 px-2 py-1"
                >
                  恢复
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">暂无帖子</div>
      )}
    </div>
  )
}
