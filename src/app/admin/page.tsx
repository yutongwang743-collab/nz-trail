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

  useEffect(() => {
    if (authed) loadPosts()
  }, [authed])

  if (loading) return <div className="text-center py-20 text-gray-400">加载中...</div>
  if (!authed) return <AdminLogin onLogin={handleLogin} />

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">内容管理</h1>

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
