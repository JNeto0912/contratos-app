-- CreateEnum
CREATE TYPE "StatusContrato" AS ENUM ('EM_PROPOSTA', 'GANHOU', 'EM_EXECUCAO', 'ENCERRADO', 'RENOVACAO');

-- CreateEnum
CREATE TYPE "StatusMarco" AS ENUM ('NAO_INICIADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'ATRASADO');

-- CreateEnum
CREATE TYPE "StatusEntrega" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'ENTREGUE', 'ATRASADA');

-- CreateEnum
CREATE TYPE "Criticidade" AS ENUM ('NORMAL', 'ATENCAO', 'CRITICO');

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "orgao" TEXT NOT NULL,
    "objeto" TEXT NOT NULL,
    "processo" TEXT,
    "valor" DECIMAL(14,2) NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "status" "StatusContrato" NOT NULL DEFAULT 'EM_PROPOSTA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marcos" (
    "id" TEXT NOT NULL,
    "contratoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "responsavel" TEXT,
    "prazo" TIMESTAMP(3) NOT NULL,
    "realizado" TIMESTAMP(3),
    "status" "StatusMarco" NOT NULL DEFAULT 'NAO_INICIADO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marcos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entregas" (
    "id" TEXT NOT NULL,
    "contratoId" TEXT NOT NULL,
    "ordemServico" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "descricao" TEXT,
    "pontosFuncao" DECIMAL(10,2),
    "horas" DECIMAL(10,2),
    "responsavel" TEXT,
    "prazo" TIMESTAMP(3) NOT NULL,
    "status" "StatusEntrega" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entregas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alertas" (
    "id" TEXT NOT NULL,
    "contratoId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "criticidade" "Criticidade" NOT NULL DEFAULT 'NORMAL',
    "lido" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alertas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contratos_numero_key" ON "contratos"("numero");

-- AddForeignKey
ALTER TABLE "marcos" ADD CONSTRAINT "marcos_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "contratos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entregas" ADD CONSTRAINT "entregas_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "contratos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "contratos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
