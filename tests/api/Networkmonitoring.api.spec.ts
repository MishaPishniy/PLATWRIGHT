import { test, expect } from '@playwright/test';

test('should log API requests from QAuto page', async ({ page }) => {
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      console.log('REQUEST:', request.method(), request.url());
    }
  });

  page.on('response', response => {
    if (response.url().includes('/api/')) {
      console.log('RESPONSE:', response.status(), response.url());
    }
  });

  await page.goto('/');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('#signinEmail').fill(process.env.USER_EMAIL!);
  await page.locator('#signinPassword').fill(process.env.USER_PASSWORD!);

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/panel\/garage/);

  await page.waitForTimeout(3000);
});