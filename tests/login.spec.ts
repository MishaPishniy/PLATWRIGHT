import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { users } from '../src/data/users';

test.describe('Login tests', () => {
  test('should login with valid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.openLoginPage();
    await loginPage.expectOpened();

    await loginPage.loginForm.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await inventoryPage.expectOpened();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.expectOpened();

    await loginPage.loginForm.login(
      users.invalidUser.username,
      users.invalidUser.password
    );

    await loginPage.loginForm.expectErrorVisible();
    await loginPage.loginForm.expectErrorToContainText(
      'Username and password do not match'
    );
  });
});