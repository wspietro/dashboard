import { api } from '@/lib/axios'

interface UpdateProfileParams {
  description: string | null
  name: string
}

export async function updateProfile({
  name,
  description,
}: UpdateProfileParams) {
  const response = await api.put('/profile', {
    name,
    description,
  })

  return response.data
}
