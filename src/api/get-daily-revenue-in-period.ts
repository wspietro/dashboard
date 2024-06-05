import { api } from '@/lib/axios'

type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

interface GetDailyRevenueInPeriodParams {
  from?: Date
  to?: Date
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodParams) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    `/metrics/daily-receipt-in-period`,
    { params: { from, to } },
  )

  return response.data
}
