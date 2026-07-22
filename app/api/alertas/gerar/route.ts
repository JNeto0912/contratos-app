// app/api/alertas/gerar/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calcularCriticidadeContrato } from '@/lib/utils'

export async function POST() {
  const contratos = await prisma.contrato.findMany({ where: { status: 'EM_EXECUCAO' } })

  for (const contrato of contratos) {
    const criticidade = calcularCriticidadeContrato(contrato.fim)
    if (!criticidade) continue

    await prisma.alerta.create({
      data: {
        contratoId: contrato.id,
        mensagem: `Contrato ${contrato.numero} vence em breve`,
        criticidade,
      },
    })
  }

  return NextResponse.json({ ok: true })
}