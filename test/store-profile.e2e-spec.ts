import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Example Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Rocket Pizza')
  await page.getByLabel('Descrição').fill('Another Description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle') // aguarda qq requisicão http finalizar

  const toast = page.getByText('Perfil atualizado com sucesso!')

  expect(toast).toBeVisible()

  page.waitForTimeout(250) // aguardar fechamento do modal

  expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()
})
