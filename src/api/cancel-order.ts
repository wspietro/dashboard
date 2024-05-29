import { api } from '@/lib/axios'

export interface CancelOrderParams {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
  // não estamos deletando, apenas alterando status
  await api.patch(`/orders/${orderId}/cancel`)
}
