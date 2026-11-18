import type { PrismaClient } from '@prisma/client'

/**
 * 从所有 Post.aiSummary 中重建 ExtractedInsight 知识库（去重 + 聚合提及次数）。
 * 幂等：先清空再重建，seed 与 import 后各调用一次即可。
 */
export async function rebuildInsights(prisma: PrismaClient): Promise<number> {
  await prisma.extractedInsight.deleteMany()

  const posts = await prisma.post.findMany({
    where: { status: { not: 'deleted' } },
    include: { route: { select: { country: true } } },
  })

  const map = new Map<string, { country: string; destination: string; type: string; content: string; source: string; confidence: string; mentionCount: number }>()

  const bump = (key: string, val: Omit<typeof map extends Map<string, infer V> ? V : never, 'mentionCount'>) => {
    const existing = map.get(key)
    if (existing) {
      existing.mentionCount++
      // 多来源提到同一内容 → 提升可信度
      if (existing.mentionCount >= 3) existing.confidence = 'high'
      else if (existing.mentionCount >= 2) existing.confidence = 'medium'
    } else {
      map.set(key, { ...val, mentionCount: 1 })
    }
  }

  for (const p of posts) {
    let summary: any = {}
    try { summary = JSON.parse(p.aiSummary) } catch { continue }

    const country = p.route?.country || '新西兰'
    const locations: string[] = summary.locations || []
    const tips: string[] = summary.keyTips || []
    const primary = locations[0] || '未标注地点'

    for (const d of locations) {
      bump(`${d}|||rec`, {
        country, destination: d, type: 'recommendation',
        content: `${d} 被旅行者推荐`, source: p.title, confidence: 'medium',
      })
    }
    for (const t of tips) {
      if (!t || typeof t !== 'string') continue
      bump(`${primary}|||${t}`, {
        country, destination: primary, type: 'travel_tip',
        content: t, source: p.title, confidence: 'low',
      })
    }
  }

  for (const v of map.values()) {
    await prisma.extractedInsight.create({ data: v })
  }
  return map.size
}
