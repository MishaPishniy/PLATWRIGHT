import { test, expect } from '@playwright/test';

test.describe('QAuto API - Profile', () => {
  test('should login and get user profile', async ({ request }) => {
    const loginResponse = await request.post('/api/auth/signin', {
      data: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
        remember: false,
      },
    });

    expect(loginResponse.status()).toBe(200);

    const profileResponse = await request.get('/api/users/profile');

    expect(profileResponse.status()).toBe(200);

    const profileBody = await profileResponse.json();

    console.log(profileBody);

    expect(profileBody.status).toBe('ok');
    expect(profileBody.data).toHaveProperty('userId');
  });
});