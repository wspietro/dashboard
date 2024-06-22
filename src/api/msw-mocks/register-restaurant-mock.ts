import { http, HttpResponse } from 'msw'

import { RegisterRestaurantBody } from '../registerRestaurant'

export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>(
  '/restaurants',
  async ({ request }) => {
    const { restaurantName } = await request.json() // body vem no formato json, axios resolve, mas aqui não

    if (restaurantName === 'Example Shop') {
      return new HttpResponse(null, { status: 201 })
    }

    return new HttpResponse(null, { status: 400 })
  },
)
