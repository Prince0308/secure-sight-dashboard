import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const incidents = await prisma.incident.findMany({
    where: { resolved: false },
    include: { camera: true },
    orderBy: { timestamp: 'desc' },
  })

  return NextResponse.json(incidents)
}
