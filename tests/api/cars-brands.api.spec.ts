import { test, expect } from '@playwright/test';

test.describe('QAuto API - Cars Brands', () => {
  test('should get all car brands', async ({ request }) => {
    const response = await request.get('/api/cars/brands');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response).toBeOK;

    const body = await response.json();

    console.log(body);

    expect(body.status).toBe('ok');
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });
});