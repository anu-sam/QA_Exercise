import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { env } from './config/env';

dotenv.config({ path: path.resolve(__dirname, '.env') });

declare const process: {
  env: {
    CI?: string;
    BASE_URL?: string;
    JS_PROMPT_NAME?: string;
    DROPDOWN_OPTION?: string;
  };
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['github'], ['html'], ['junit', { outputFile: 'test-results/junit.xml' }]]
    : 'html',
  use: {
    baseURL: env.baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
