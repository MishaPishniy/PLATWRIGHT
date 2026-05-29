import { test, expect } from '@playwright/test';

test.describe('QAuto API - Auth', () => {
  test('should login with valid user', async ({ request }) => {
    const response = await request.post('/api/auth/signin', {
      data: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
        remember: false,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.status).toBe('ok');
  });
});