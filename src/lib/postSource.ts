// 判断帖子 URL 是否为「真实原帖」链接（而非搜索/聚合链接）。
// seed 里的模拟帖子用的是 xiaohongshu.com/search_result?keyword=... 这类搜索链接，
// 属于「无原帖」，应被过滤掉。

export function isRealPostUrl(url: string): boolean {
  if (!url) return false
  const u = url.toLowerCase()
  // 搜索/聚合链接 → 非真实原帖
  if (u.includes('search_result') || u.includes('search?') || u.includes('keyword=')) return false
  return true
}
