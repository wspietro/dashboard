import { http, HttpResponse } from 'msw'

import { SignInBody } from '../sign-in'

export const signInMock = http.post<never, SignInBody>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json() // body vem no formato json, axios resolve, mas aqui não

    if (email === 'johndoe@example.com') {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'auth=example-jwt', // cookie auth determina se usuário está logado
        },
      })
    }

    return new HttpResponse(null, { status: 401 })
  },
)
