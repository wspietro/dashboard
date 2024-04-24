import { OrderStatusEnum } from '@/api/list-orders'

interface OrderStatusProps {
  status: OrderStatusEnum
}

interface StatusInfo {
  text: string
  color: string
}

const statusInfoMap: Record<OrderStatusEnum, StatusInfo> = {
  // recorde, tipagem da chave e valor
  pending: { text: 'Pendente', color: 'bg-slate-500' },
  canceled: { text: 'Cancelado', color: 'bg-rose-500' },
  delivered: { text: 'Entregue', color: 'bg-emerald-500' },
  delivering: { text: 'Em entrega', color: 'bg-amber-500' },
  processing: { text: 'Em preparo', color: 'bg-amber-500' },
} // object literal. Ficou show

export function OrderStatus({ status }: OrderStatusProps) {
  const { text, color } = statusInfoMap[status]

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`}></span>
      <span className={`text-${color} font-medium`}>{text}</span>
    </div>
  )
}
