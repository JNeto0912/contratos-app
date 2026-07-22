// app/api/contratos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const contratos = await prisma.contrato.findMany({
    include: { marcos: true, entregas: true },
    orderBy: { fim: 'asc' },
  })
  return NextResponse.json(contratos)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const contrato = await prisma.contrato.create({ data: body })
  return NextResponse.json(contrato, { status: 201 })
}