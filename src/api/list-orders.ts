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

export interface GetOrdersQuery {
  status?: OrderStatusEnum
  orderId?: string
  customerName?: string
  pageIndex?: number | null
}

export async function listOrders({ pageIndex }: GetOrdersQuery) {
  const response = await api.get<ListOrdersResponse>('/orders', {
    params: {
      pageIndex, // único obrigatório
    },
  })

  return response.data
}
