import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostById } from '@/lib/data'

interface PostPageProps {
  params: { slug: string }
}

export default async function PostPage({ params }: PostPageProps) {
  const postId = parseInt(params.slug)
  if (isNaN(postId)) notFound()

  const post = await getPostById(postId)
  if (!post || post.status === 'deleted') notFound()

  const summary = post.aiSummary

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-600">首页</Link>
        <span className="mx-2">/</span>
        {post.route && (
          <>
            <Link href={`/routes/${post.route.slug}`} className="hover:text-gray-600">
              {post.route.title}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-gray-600">帖子详情</span>
      </div>

      {/* Blogger info card */}
      <div className="card p-5 mb-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-md">
            {post.authorName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-semibold text-gray-900">{post.authorName}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 font-medium">小红书博主</span>
            </div>
            <div className="text-sm text-gray-500">
              {post.sourcePlatform} · {new Date(post.sourcePublishedAt).toLocaleDateString('zh-CN')} 发布
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>❤️ {post.likes} 赞</span>
              <span>⭐ {post.saves} 收藏</span>
              <span>💬 {post.comments} 评论</span>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h1>

      {post.screenshots && post.screenshots.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mb-6">
          {post.screenshots.map((url: string, i: number) => (
            <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
              📸 原帖截图 {i + 1}
            </div>
          ))}
        </div>
      )}

      <div className="card p-4 mb-6 border-brand-100 bg-brand-50/30">
        <h2 className="font-semibold text-gray-900 mb-3">🤖 AI 路线要点提取</h2>
        <div className="space-y-2 text-sm">
          {summary.locations?.length > 0 && (
            <div className="flex gap-2">
              <span className="text-gray-400 shrink-0">📍 地点:</span>
              <span className="text-gray-700">{summary.locations.join('、')}</span>
            </div>
          )}
          {summary.activities?.length > 0 && (
            <div className="flex gap-2">
              <span className="text-gray-400 shrink-0">🎯 活动:</span>
              <span className="text-gray-700">{summary.activities.join('、')}</span>
            </div>
          )}
          {summary.duration && (
            <div className="flex gap-2">
              <span className="text-gray-400 shrink-0">⏱️ 建议时长:</span>
              <span className="text-gray-700">{summary.duration}</span>
            </div>
          )}
          {summary.budget && (
            <div className="flex gap-2">
              <span className="text-gray-400 shrink-0">💰 预算:</span>
              <span className="text-gray-700">{summary.budget}</span>
            </div>
          )}
          {summary.transport && (
            <div className="flex gap-2">
              <span className="text-gray-400 shrink-0">🚗 交通:</span>
              <span className="text-gray-700">{summary.transport}</span>
            </div>
          )}
          {summary.keyTips?.length > 0 && (
            <div className="flex gap-2">
              <span className="text-gray-400 shrink-0">💡 提示:</span>
              <span className="text-gray-700">{summary.keyTips.join('；')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card p-4 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">📝 原文内容</h2>
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{post.rawContent}</p>
      </div>

      <div className="flex gap-4 text-sm text-gray-400 mb-6">
        <span>❤️ {post.likes} 赞</span>
        <span>⭐ {post.saves} 收藏</span>
        <span>💬 {post.comments} 评论</span>
      </div>

      {/* Direct blogger link */}
      <div className="card p-4 bg-gradient-to-r from-red-50 to-pink-50 border-red-100 mb-6">
        <p className="text-sm text-gray-600 mb-3">
          想看更多 {post.authorName} 的分享？点击下方跳转小红书查看博主主页，获取更多真实旅行记录和实用攻略。
        </p>
        <a
          href={post.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 rounded-xl text-sm font-bold text-white transition hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #ff5a5f, #e51d1d)' }}
        >
          📕 在小红书查看 @{post.authorName} 的主页 →
        </a>
      </div>
    </div>
  )
}
