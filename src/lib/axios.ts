import axios from 'axios'

import { env } from './env'

export const api = axios.create({
  baseURL: env.VITE_API_URL, // url do backend
  withCredentials: true, // cookies do front são automaticamente enviados ao be
})
