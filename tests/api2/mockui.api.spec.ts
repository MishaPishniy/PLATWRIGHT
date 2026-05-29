import { test, expect } from '@playwright/test';

test('UI should display fake cars from mocked API', async ({ page }) => {
  await page.route('**/api/cars', async route => {
    console.log('Mocked request:', route.request().url());

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: [
          {
            id: 1,
            carBrandId: 1,
            carModelId: 1,
            initialMileage: 100,
            updatedMileageAt: '2026-05-29T10:00:00.000Z',
            carCreatedAt: '2026-05-29T10:00:00.000Z',
            mileage: 100,
            brand: 'STUDENT MOCK CAR',
            model: 'PLAYWRIGHT EDITION',
            logo: 'audi.png',
          },
        ],
      }),
    });
  });

  await page.goto('/panel/garage');
 
  await page.pause();

  await expect(page.getByText('STUDENT MOCK CAR')).toBeVisible();
  await expect(page.getByText('PLAYWRIGHT EDITION')).toBeVisible();
});