import { api } from '@/lib/axios'

interface GetPopularProducts {
  product: string
  amount: number
}

export async function getPopularProducts() {
  const response = await api.get<GetPopularProducts[]>(
    '/metrics/popular-products',
  )

  return response.data
}
