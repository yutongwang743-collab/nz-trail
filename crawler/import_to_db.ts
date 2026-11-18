import { PrismaClient } from '@prisma/client'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { rebuildInsights } from '../src/lib/insights'

/**
 * 把爬虫产出的 db_import.json（ai_pipeline 的 save_to_db_format 格式）
 * 批量导入 Post 表，用 sourceUrl 去重（已存在则跳过）。
 *
 * 用法: npx tsx crawler/import_to_db.ts [db_import.json 路径]
 * 默认读取 crawler/db_import.json 或 ./db_import.json
 */

const prisma = new PrismaClient()

interface ImportPost {
  sourcePlatform?: string
  sourceUrl?: string
  authorName?: string
  title?: string
  rawContent?: string
  aiSummary?: string
  screenshots?: string
  likes?: number
  saves?: number
  comments?: number
  sourcePublishedAt?: string
}

function resolveInputPath(arg?: string): string {
  if (arg) return path.resolve(process.cwd(), arg)
  const candidates = [
    path.join(process.cwd(), 'crawler', 'db_import.json'),
    path.join(process.cwd(), 'db_import.json'),
  ]
  for (const c of candidates) if (existsSync(c)) return c
  return candidates[0]
}

function toDate(s?: string): Date {
  if (!s) return new Date()
  const d = new Date(s)
  return isNaN(d.getTime()) ? new Date() : d
}

async function main() {
  const inputPath = resolveInputPath(process.argv[2])
  if (!existsSync(inputPath)) {
    console.error(`❌ 找不到文件: ${inputPath}`)
    console.error('用法: npx tsx crawler/import_to_db.ts [db_import.json 路径]')
    process.exit(1)
  }

  let posts: ImportPost[] = []
  try {
    posts = JSON.parse(readFileSync(inputPath, 'utf-8'))
  } catch (e) {
    console.error('❌ JSON 解析失败:', e)
    process.exit(1)
  }
  if (!Array.isArray(posts)) {
    console.error('❌ 文件格式错误：应为数组')
    process.exit(1)
  }

  console.log(`读取 ${posts.length} 条帖子，开始导入...\n`)

  let inserted = 0
  let skipped = 0
  let failed = 0
  for (const p of posts) {
    const url = p.sourceUrl
    if (!url) {
      skipped++
      continue
    }

    const exists = await prisma.post.findUnique({ where: { sourceUrl: url } })
    if (exists) {
      skipped++
      continue
    }

    try {
      await prisma.post.create({
        data: {
          sourcePlatform: p.sourcePlatform || '小红书',
          sourceUrl: url,
          authorName: p.authorName || '匿名',
          authorAvatar: '',
          title: p.title || '未命名',
          rawContent: p.rawContent || '',
          aiSummary: p.aiSummary || '{}',
          screenshots: p.screenshots || '[]',
          likes: p.likes || 0,
          saves: p.saves || 0,
          comments: p.comments || 0,
          status: 'auto_published',
          sourcePublishedAt: toDate(p.sourcePublishedAt),
        },
      })
      inserted++
    } catch (e: any) {
      console.error(`  导入失败 (${url}): ${e?.message || e}`)
      failed++
    }
  }

  const insightCount = await rebuildInsights(prisma)
  console.log(`\n✅ 导入完成：新增 ${inserted} 条，跳过 ${skipped} 条（已存在/无链接），失败 ${failed} 条；重建知识库 ${insightCount} 条`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
