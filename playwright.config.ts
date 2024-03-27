import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: `./.env`,
});

export const AUTHENTICATED_USER_STATE = path.join(process.cwd(), 'playwright/.auth/authenticatedUser.json');

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html']],
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'setup', testMatch: 'src/tests/setup.spec.ts' },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },
  ],
});
