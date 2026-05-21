'use client'

import { useState } from 'react'

interface AdminLoginProps {
  onLogin: (password: string) => Promise<boolean>
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const ok = await onLogin(password)
    if (!ok) setError('密码错误')
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 card space-y-4">
      <h1 className="text-xl font-bold text-gray-900">管理员登录</h1>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="输入管理密码"
        className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full py-2 bg-gray-900 text-white rounded-xl text-sm font-medium disabled:opacity-50"
      >
        {loading ? '验证中...' : '登录'}
      </button>
    </form>
  )
}
