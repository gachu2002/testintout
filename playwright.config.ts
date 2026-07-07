import { existsSync } from 'node:fs';

import { defineConfig, devices } from '@playwright/test';

const isCi = Boolean(process.env.CI);
const apiBaseUrl = process.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:3001/api';
const localChromiumLibraryPath =
  process.env.PLAYWRIGHT_CHROMIUM_LIBRARY_PATH ??
  '/tmp/opencode/chrome-libs/usr/lib/x86_64-linux-gnu';
const chromiumLibraryPath = existsSync(localChromiumLibraryPath)
  ? [localChromiumLibraryPath, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':')
  : process.env.LD_LIBRARY_PATH;

export default defineConfig({
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: 'disabled',
      maxDiffPixelRatio: 0.03,
    },
  },
  forbidOnly: isCi,
  fullyParallel: false,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [['list'], ['html', { open: 'never' }]],
  retries: isCi ? 1 : 0,
  testDir: './tests/visual',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:3000',
    launchOptions: chromiumLibraryPath
      ? {
          env: {
            LD_LIBRARY_PATH: chromiumLibraryPath,
          },
        }
      : undefined,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    viewport: { height: 1000, width: 1440 },
  },
  webServer: [
    {
      command: 'node mock-api/server.mjs',
      reuseExistingServer: !isCi,
      timeout: 15_000,
      url: 'http://127.0.0.1:3001/api/v2/launchpad/overview',
    },
    {
      command: 'pnpm dev',
      env: {
        VITE_API_BASE_URL: apiBaseUrl,
      },
      reuseExistingServer: !isCi,
      timeout: 30_000,
      url: 'http://127.0.0.1:3000',
    },
  ],
});
