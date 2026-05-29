import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',

    httpCredentials: {
      username: process.env.HTTP_USERNAME || 'guest',
      password: process.env.HTTP_PASSWORD || 'welcome2qauto',
    },
  },

  projects: [
    {
      name: 'setup',
      testDir: './tests',
      testMatch: '**/auth.setup.ts',
    },

    {
      name: 'api',
      testDir: './tests/api',
      testMatch: '**/*.spec.ts',
    },

    {
      name: 'api2',
      testDir: './tests/api2',
      testMatch: '**/*.spec.ts',
      dependencies: ['setup'],
      use: {
        storageState: '.auth/api-user.json',
      },
    },
  ],
});