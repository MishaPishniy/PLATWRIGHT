import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',

    httpCredentials: {
      username: process.env.HTTP_USERNAME || 'guest',
      password: process.env.HTTP_PASSWORD || 'welcome2qauto',
    },

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    {
      name: 'chromium',
      dependencies: ['setup'],
      testDir: './tests/GARAGE',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
    },
  ],
});