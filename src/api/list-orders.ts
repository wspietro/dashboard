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

export interface ListOrdersResponse {
  orders: Array<Order>
  meta: OrderMeta // informações para paginação
}

export interface GetOrdersQuery {
  status?: string | null
  orderId?: string | null
  customerName?: string | null
  pageIndex?: number | null
}

export async function listOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const response = await api.get<ListOrdersResponse>('/orders', {
    params: {
      pageIndex, // único obrigatório
      customerName,
      orderId,
      status,
    },
  })

  return response.data
}
