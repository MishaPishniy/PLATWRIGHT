import { test, expect } from '@playwright/test';

test('should mock cars brands API', async ({ page }) => {
  await page.route('**/api/cars/brands', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: [
          {
            id: 999,
            title: 'Mock Brand',
            logoFilename: 'mock.png',
          },
        ],
      }),
    });
  });

  await page.goto('/');

  const data = await page.evaluate(async () => {
    const response = await fetch('/api/cars/brands');
    return response.json();
  });

  expect(data.status).toBe('ok');
  expect(data.data[0].title).toBe('Mock Brand');
});