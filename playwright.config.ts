import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,       // Run sequentially — cache tests depend on order
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,                 // Single worker to prevent race conditions on cache
  reporter: [['html'], ['list']],
  timeout: 120_000,           // 2 min per test — API calls can be slow

  use: {
    baseURL: 'https://devtez.91trucks.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },

  projects: [
    {
      name: 'cache-invalidation',
      testDir: './tests/cache',
    },
  ],
});
