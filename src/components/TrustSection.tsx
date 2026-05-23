export default function TrustSection() {
  const items = [
    {
      icon: '🗺️',
      title: '覆盖南北岛',
      desc: '从北岛霍比屯到南岛米尔福德峡湾，精选覆盖新西兰全境的旅行路线',
    },
    {
      icon: '🤖',
      title: 'AI 智能规划',
      desc: '基于真实旅行数据训练的 AI，根据你的偏好生成个性化行程方案',
    },
    {
      icon: '📱',
      title: '真实体验验证',
      desc: '每条路线都经过小红书等社交媒体上的真实旅行者分享验证',
    },
    {
      icon: '📅',
      title: '实时更新',
      desc: '旅行信息和预算数据持续更新，确保你看到的是最新、最准确的内容',
    },
  ]

  return (
    <section className="border-t border-gray-100 mt-12 pt-12 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          为什么选择 NZ Trail
        </h2>
        <p className="text-sm text-gray-500">
          不只是一个旅行网站，更像是你身边的新西兰旅行伙伴
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.title} className="text-center p-4 rounded-2xl hover:bg-gray-50 transition">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          AI 辅助规划 · 人工精选路线 · 旅行者真实验证
        </p>
      </div>
    </section>
  )
}
