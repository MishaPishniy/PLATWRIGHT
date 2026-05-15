import { test, expect } from '@playwright/test';

test('Inventory page screenshot', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveScreenshot('inventory-page.png');
});


test('Product card screenshot', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  const backpackCard = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Bike Light',
  });

  await expect(backpackCard).toHaveScreenshot('backpack-card.png');
});

test('Screenshot with mask example', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveScreenshot('inventory-masked.png', {
    mask: [page.locator('.shopping_cart_link')],
  });
});