import { api } from '@/lib/axios'

interface GetMonthRevenue {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenue>('/metrics/month-receipt')

  return response.data
}
