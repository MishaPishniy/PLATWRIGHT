import { test, expect } from '../fixtures/api.fixture';

test('should get user profile with auth fixture', async ({ authRequest }) => {
  const response = await authRequest.get('/api/users/profile');

  console.log('Response status:', response.status());
  console.log('Response URL:', response.url());

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log('Response body:', body);

  expect(body.status).toBe('ok');
});