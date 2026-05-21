export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">关于 NZ Trail</h1>
      <div className="prose prose-gray text-sm space-y-4">
        <p>
          NZ Trail 是一个为澳洲留学生打造的新西兰旅行计划工具。
          我们聚合小红书、抖音等社交媒体上的真实旅行帖子，用 AI 提取结构化路线信息，
          帮你快速找到适合自己的新西兰旅行方案。
        </p>
        <h2 className="text-lg font-semibold mt-8">信息来源</h2>
        <p>
          所有路线和帖子均来源于公开社交平台，我们会在帖子详情页标注原作者和跳转原链接。
          如果你发现自己的内容被收录且希望移除，请通过 GitHub Issues 联系我们。
        </p>
        <h2 className="text-lg font-semibold mt-8">免责声明</h2>
        <p>
          路线方案和预算信息仅供参考，实际价格随季节和预订时间波动。
          出行前请核实最新信息。
        </p>
      </div>
    </div>
  )
}
