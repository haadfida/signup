// playwright.config.mjs
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  timeout: 120 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [ ['html', { open: 'never' } ], ['list'] ],
  use: {
    baseURL: 'https://ezo.io',
    browserName: 'chromium',
    headless: process.env.CI ? true : false,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
