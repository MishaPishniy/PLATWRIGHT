import { test, expect } from '@playwright/test';

test.describe('QAuto API - Cars', () => {
  test.beforeEach(async ({ request }) => {
    const loginResponse = await request.post('/api/auth/signin', {
      data: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
        remember: false,
      },
    });

    expect(loginResponse.status()).toBe(200);
  });

  test('should create a new car', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    console.log(body);

    expect(body.status).toBe('ok');
    expect(body.data).toHaveProperty('id');
    expect(body.data.mileage).toBe(100);
  });
});