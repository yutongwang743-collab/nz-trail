'use client'

import { useState } from 'react'

interface PostData {
  id: number
  title: string
  authorName: string
  sourcePlatform: string
  sourceUrl: string
  rawContent: string
  likes: number
  saves: number
  comments: number
  aiSummary: {
    locations?: string[]
    activities?: string[]
    duration?: string
    budget?: string
    season?: string
    transport?: string
    keyTips?: string[]
  }
}

interface ExpandablePostCardProps {
  post: PostData
}

export default function ExpandablePostCard({ post }: ExpandablePostCardProps) {
  const [expanded, setExpanded] = useState(false)
  const summary = post.aiSummary

  return (
    <div className={`card transition-all duration-300 ${expanded ? 'ring-2 ring-brand-100 shadow-md' : 'hover:shadow-md'}`}>
      {/* Header — always visible, clickable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {post.authorName[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-700 truncate">{post.authorName}</span>
            <span className="text-xs text-gray-400">{post.sourcePlatform}</span>
          </div>
          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{post.title}</h4>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>❤️ {post.likes}</span>
            <span>⭐ {post.saves}</span>
            <span>💬 {post.comments}</span>
            <span className="text-brand-500 ml-auto">
              {expanded ? '收起 ▲' : '展开查看 ▼'}
            </span>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-4">
          {/* AI Summary tags */}
          {summary.locations && summary.locations.length > 0 && (
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">📍 提到的地点</div>
              <div className="flex flex-wrap gap-1.5">
                {summary.locations.map((loc, i) => (
                  <span key={i} className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded-full">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {summary.activities && summary.activities.length > 0 && (
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">🎯 提到的活动</div>
              <div className="flex flex-wrap gap-1.5">
                {summary.activities.map((act, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    {act}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {summary.duration && <span>⏱️ {summary.duration}</span>}
            {summary.budget && <span>💰 {summary.budget}</span>}
            {summary.season && <span>📅 {summary.season}</span>}
            {summary.transport && <span>🚗 {summary.transport}</span>}
          </div>

          {summary.keyTips && summary.keyTips.length > 0 && (
            <div className="p-3 bg-amber-50 rounded-xl">
              <div className="text-xs font-medium text-amber-700 mb-2">💡 关键提示</div>
              <ul className="text-xs text-amber-800 space-y-1">
                {summary.keyTips.map((tip, i) => (
                  <li key={i} className="flex gap-1.5">
                    <span className="shrink-0">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Raw content snippet */}
          <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">
            {post.rawContent.slice(0, 200)}
            {post.rawContent.length > 200 && '...'}
          </div>

          {/* Source link button */}
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2.5 rounded-xl text-sm font-medium transition"
            style={{
              background: 'linear-gradient(135deg, #ff5a5f, #e51d1d)',
              color: 'white',
            }}
          >
            在小红书查看原帖及相关内容 →
          </a>
        </div>
      )}
    </div>
  )
}

// Non-expandable compact version for sidebar/inline
export function CompactPostCard({ post }: ExpandablePostCardProps) {
  return (
    <a
      href={`/posts/${post.id}`}
      className="card p-3 hover:shadow-md transition block group"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {post.authorName[0]}
        </div>
        <span className="text-xs text-gray-600 truncate">{post.authorName}</span>
        <span className="text-xs text-gray-400 ml-auto">{post.sourcePlatform}</span>
      </div>
      <p className="text-sm text-gray-700 line-clamp-2 group-hover:text-brand-500 transition-colors">
        {post.title}
      </p>
      <div className="flex gap-3 text-xs text-gray-400 mt-2">
        <span>❤️ {post.likes}</span>
        <span>💬 {post.comments}</span>
      </div>
    </a>
  )
}
