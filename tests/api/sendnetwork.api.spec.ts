import { test, expect } from '@playwright/test';

test('should send signin API request after UI login', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('#signinEmail').fill(process.env.USER_EMAIL!);
  await page.locator('#signinPassword').fill(process.env.USER_PASSWORD!);

  const loginResponsePromise = page.waitForResponse(response =>
    response.url().includes('/api/auth/signin') &&
    response.request().method() === 'POST'
  );

  await page.getByRole('button', { name: 'Login' }).click();

  const loginResponse = await loginResponsePromise;

  expect(loginResponse.status()).toBe(200);

  const body = await loginResponse.json();

  expect(body.status).toBe('ok');

  await expect(page).toHaveURL(/panel\/garage/); 
});