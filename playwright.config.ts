import { defineConfig } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './test',
  /* Roda testes em paralelo (paralelismo) */
  fullyParallel: true,
  /* Determina se os testes devem dar erro caso tenham only em ambiente de CI */
  forbidOnly: !!process.env.CI,
  /* Testes e2e falham por motivos adversos. Executamos duas vezes o teste */
  retries: process.env.CI ? 2 : 0,
  /* Quantos testes quero rodar em paralelo (em CI geralmente temos 1 núcleo) */
  workers: process.env.CI ? 1 : undefined,
  /* Formato que devemos exportar os resultados dos testes */
  // reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* URL da aplicação enquanto rodamos os testes */
    baseURL: 'http://localhost:50789',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:50789',
    /* Reaproveitar o servidor para os demais testes */
    reuseExistingServer: !process.env.CI,
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  //   {
  //     name: 'Microsoft Edge',
  //     use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   },
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   },
  // ],
})
