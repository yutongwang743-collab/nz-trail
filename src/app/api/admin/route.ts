import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme'

export async function POST(req: NextRequest) {
  const body = await req.json()

  switch (body.action) {
    case 'login': {
      if (body.password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ ok: true })
        response.cookies.set('admin_token', ADMIN_PASSWORD, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24,
        })
        return response
      }
      return NextResponse.json({ ok: false, error: 'Wrong password' }, { status: 401 })
    }

    case 'verify': {
      const token = req.cookies.get('admin_token')?.value
      return NextResponse.json({ ok: token === ADMIN_PASSWORD })
    }

    case 'list_posts': {
      const token = req.cookies.get('admin_token')?.value
      if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const posts = await prisma.post.findMany({
        orderBy: { crawledAt: 'desc' },
        take: 50,
        include: { route: { select: { title: true } } },
      })
      return NextResponse.json({ posts })
    }

    case 'update_post': {
      const token = req.cookies.get('admin_token')?.value
      if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const { id, status, routeId } = body
      await prisma.post.update({
        where: { id },
        data: {
          ...(status ? { status } : {}),
          ...(routeId !== undefined ? { routeId } : {}),
        },
      })
      return NextResponse.json({ ok: true })
    }

    case 'update_route': {
      const token = req.cookies.get('admin_token')?.value
      if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const { id, description, featuredOrder } = body
      await prisma.route.update({
        where: { id },
        data: {
          ...(description !== undefined ? { description } : {}),
          ...(featuredOrder !== undefined ? { featuredOrder } : {}),
        },
      })
      return NextResponse.json({ ok: true })
    }

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  }
}
