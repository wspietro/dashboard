import { expect, test } from '@playwright/test'

test('sign successfully', async ({ page }) => {
  // temos a base-url
  // aguarda até todas requisições finalizarem
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail:').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail.',
  )

  expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail:').fill('wrongemail@example.com')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText('Credenciais inválidas.')

  expect(toast).toBeVisible()
})

test('navigate to new restaurante page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  const heading = page.getByRole('heading', { name: 'Criar conta grátis' })

  expect(heading).toBeVisible()
  expect(page.url()).toContain('/sign-up')
})
