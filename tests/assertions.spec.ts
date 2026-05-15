import { test, expect } from "@playwright/test";

test('Assertions examples after login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
  await expect(page.locator('[data-test="username"]')).toHaveAttribute('placeholder', 'Username');
  await expect(page.locator('[data-test="login-button"]')).toHaveCSS('background-color', 'rgb(61, 220, 145)');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('.inventory_item')).toHaveCount(6);
  await expect(page.locator('.shopping_cart_link')).toBeVisible();
  await expect(page.locator('.shopping_cart_link')).not.toBeVisible({ timeout: 10000} );
  await expect([1,2,3]).toHaveLength(3)
});

test('Invalid login shows error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('wrong_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Username and password do not match');
});


test('add item to cart and check cart badge', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const backpackItem = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  await backpackItem.getByRole('button', { name: 'Add to cart' }).click();

  await expect(backpackItem.getByRole('button', { name: 'Remove' })).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});


test('sort products from Z to A', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const sortDropdown = page.locator('[data-test="product-sort-container"]');

  await sortDropdown.selectOption('za');

  await expect(sortDropdown).toHaveValue('za');

  const productNames = page.locator('.inventory_item_name');

  await expect(productNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
});