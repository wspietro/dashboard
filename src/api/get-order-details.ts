import { api } from '@/lib/axios'

import { OrderStatusEnum } from './list-orders'

type CustomerDetails = {
  name: string
  phone: string | null
  email: string
}

type ItemsDetails = {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}

export interface GetOrderDetailsResponse {
  id: string
  createdAt: string
  status: OrderStatusEnum
  totalInCents: number
  customer: CustomerDetails
  orderItems: ItemsDetails[]
}

interface getOrderDetailsParams {
  orderId: string
}

export async function getOrderDetails({ orderId }: getOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
