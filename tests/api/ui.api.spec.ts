import { test, expect } from '@playwright/test';

test.describe('User Profile - Mock API response', () => {
  test.use({
    storageState: '.auth/user.json',
  });

  test('should display mocked user profile data', async ({ page }) => {
    const mockedProfileResponse = {
      status: 'ok',
      data: {
        userId: 99999,
        photoFilename: 'default-user.png',
        name: 'MockedName',
        lastName: 'MockedLastName',
      },
    };

    await page.route('**/api/users/profile', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedProfileResponse),
      });
    });

    await page.goto('/panel/profile');

    await expect(page.getByText('MockedName')).toBeVisible();
    await expect(page.getByText('MockedLastName')).toBeVisible();
  });
});