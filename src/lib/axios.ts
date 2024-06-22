import axios from 'axios'

import { env } from '../env'

export const api = axios.create({
  baseURL: env.VITE_API_URL, // url do backend
  withCredentials: true, // cookies do front são automaticamente enviados ao be
})

// criar delay para a aplicação, simulando um banco de dados em prod (local é muito rápido)
// intercepta cada requisicao (corpo, cabeçalho, dados)
if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise(
      (resolve) => setTimeout(resolve, Math.round(Math.random() * 3000)), // simulando delay aleatorios
    )

    return config
  })
}
