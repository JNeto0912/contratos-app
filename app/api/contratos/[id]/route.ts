// app/api/contratos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const contrato = await prisma.contrato.findUnique({
    where: { id },
    include: {
      marcos: { orderBy: { prazo: 'asc' } },
      entregas: { orderBy: { prazo: 'asc' } },
      alertas: { where: { lido: false } },
    },
  })

  if (!contrato) {
    return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  }
  return NextResponse.json(contrato)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()

  const contrato = await prisma.contrato.update({
    where: { id },
    data: body,
  })
  return NextResponse.json(contrato)
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  await prisma.contrato.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}