// playwright.config.mjs
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 1000 * 1000,
  expect: {
    timeout: 1000 * 1000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
  },
});
