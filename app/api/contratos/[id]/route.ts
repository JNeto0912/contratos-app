// app/api/contratos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const contrato = await prisma.contrato.findUnique({
    where: { id },
  });

  if (!contrato) {
    return NextResponse.json(
      { error: "Registro não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(contrato);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();

  const contrato = await prisma.contrato.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(contrato);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  await prisma.contrato.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}