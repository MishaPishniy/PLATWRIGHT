import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import path from 'node:path';

//require('dotenv').config({path: './.env.qa'})

console.log(process.env.TEST_ENV)
config()

export default defineConfig({
  testDir: './tests',
  testMatch: '**.spec.ts',

  fullyParallel: true,

  reporter: 'html',

  use: {
    baseURL: process.env.Base_URL,
   /* httpCredentials: {
      username: process.env.USER_NAME!,
      password: process.env.USER_PASSWORD!

    },*/
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
        {
      name: 'saused',
      testDir:'./tests/login',
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
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
