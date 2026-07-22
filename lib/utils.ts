// lib/utils.ts
import { differenceInCalendarDays } from 'date-fns'

export function calcularCriticidadeContrato(fim: Date): 'NORMAL' | 'ATENCAO' | 'CRITICO' | null {
  const dias = differenceInCalendarDays(fim, new Date())

  if (dias <= 7) return 'CRITICO'
  if (dias <= 15) return 'ATENCAO'
  if (dias <= 30) return 'NORMAL'
  return null
}

export function calcularStatusEntrega(prazo: Date, entregue: boolean): 'ATRASADA' | 'PENDENTE' {
  if (entregue) return 'PENDENTE'
  return prazo < new Date() ? 'ATRASADA' : 'PENDENTE'
}