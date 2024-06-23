import { expect, test } from '@playwright/test'

test('navigate to sign-in', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer Login' }).click()

  expect(page.url()).toContain('/sign-in')
})

test('sign-up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento:').fill('Example Shop')
  await page.getByLabel('Seu nome:').fill('John Doe')
  await page.getByLabel('Seu e-mail:').fill('johndoe@example.com')
  await page.getByLabel('Seu telefone:').fill('11 999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible()
})

test('navigate to sign-in after sign-up', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento:').fill('Example Shop')
  await page.getByLabel('Seu nome:').fill('John Doe')
  await page.getByLabel('Seu e-mail:').fill('johndoe@example.com')
  await page.getByLabel('Seu telefone:').fill('11 999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  await page.getByRole('button', { name: 'Login' }).click()

  const emailInput = page.getByLabel('Seu e-mail:')

  expect(page.url()).toContain('/sign-in')
  expect(emailInput).toHaveValue('johndoe@example.com')
})

test('sign-up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento:').fill('Wrong Shop')
  await page.getByLabel('Seu nome:').fill('John Doe')
  await page.getByLabel('Seu e-mail:').fill('johndoe@example.com')
  await page.getByLabel('Seu telefone:').fill('11 999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadstrar restaurante.')

  expect(toast).toBeVisible()
})
