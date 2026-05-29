import { test as base, expect, APIRequestContext } from '@playwright/test';

type ApiFixtures = {
  authRequest: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  authRequest: async ({ request }, use) => {
    const loginResponse = await request.post('/api/auth/signin', {
      data: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
        remember: false,
      },
    });

    expect(loginResponse.status()).toBe(200);

    await use(request);

    await request.post('/api/auth/logout');
  },
});

export { expect };