import { api } from '@/lib/axios'

export enum OrderStatusEnum {
  Pending = 'pending',
  Canceled = 'canceled',
  Processing = 'processing',
  Delivering = 'delivering',
  Delivered = 'delivered',
}

export type Order = {
  orderId: string
  createdAt: string
  status: OrderStatusEnum
  customerName: string
  total: number
}

export type OrderMeta = {
  pageIndex: number
  perPage: number
  totalCount: number
}

interface ListOrdersResponse {
  orders: Array<Order>
  meta: OrderMeta // informações para paginação
}

export async function listOrders() {
  const response = await api.get<ListOrdersResponse>('/orders', {
    params: {
      pageIndex: 0, // único obrigatório
    },
  })

  return response.data
}
