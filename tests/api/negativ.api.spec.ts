import { test, expect } from '@playwright/test';

test.describe('QAuto API - Negative Auth', () => {
  test('should not login with invalid password', async ({ request }) => {
    const response = await request.post('/api/auth/signin', {
      data: {
        email: process.env.USER_EMAIL,
        password: 'wrong-password',
        remember: false,
      },
    });

    expect([400, 401]).toContain(response.status());

    const body = await response.json();

    console.log(body);

    expect(body.status).not.toBe('ok');
  });
});