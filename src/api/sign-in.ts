import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

// envia um link de autenticação para o email
// um registro é criado no banco authLinks
// autenticação é feita por jwt
export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email })
}
