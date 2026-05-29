import { test, expect } from '@playwright/test';

test('should modify cars brands response', async ({ page }) => {
  await page.route('**/api/cars/brands', async route => {
    const response = await route.fetch();
    const json = await response.json();

    json.data = json.data.slice(0, 1);

    await route.fulfill({
      response,
      json,
    });
  });

  await page.goto('/');

  const data = await page.evaluate(async () => {
    const response = await fetch('/api/cars/brands');
    return response.json();
  });

  expect(data.data.length).toBe(1);
});