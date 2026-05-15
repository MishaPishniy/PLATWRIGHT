import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { users } from '../src/data/users';
import { products } from '../src/data/products';

test.describe('Cart tests', () => {
  test('should add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.openLoginPage();

    await loginPage.loginForm.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await inventoryPage.expectOpened();

    await inventoryPage.expectProductVisible(products.backpack);

    await inventoryPage.addProductToCart(products.backpack);

    await inventoryPage.header.expectCartBadgeCount(1);

    await inventoryPage.header.openCart();

    await cartPage.expectOpened();

    await cartPage.expectProductInCart(products.backpack);
  });
});