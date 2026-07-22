// components/contratos/ContratoCard.tsx
import { formatDistanceToNow, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const statusColors = {
  EM_PROPOSTA: 'bg-gray-100 text-gray-700',
  GANHOU: 'bg-blue-100 text-blue-700',
  EM_EXECUCAO: 'bg-green-100 text-green-700',
  ENCERRADO: 'bg-gray-300 text-gray-600',
  RENOVACAO: 'bg-yellow-100 text-yellow-700',
}

export function ContratoCard({ contrato }: { contrato: any }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{contrato.cliente}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[contrato.status]}`}>
          {contrato.status.replace('_', ' ')}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-3">{contrato.objeto}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{format(contrato.inicio, 'dd/MM/yyyy')} — {format(contrato.fim, 'dd/MM/yyyy')}</span>
        <span className="font-medium">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.valor)}
        </span>
      </div>
    </div>
  )
}