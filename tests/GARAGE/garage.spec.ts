import { test, expect } from '@playwright/test';

test('open garage as authorized user', async ({ page }) => {


  await page.goto('/panel/garage');
  await expect(page).toHaveURL(/panel\/garage/);


  //await expect(page.getByText('Garage')).toBeVisible();
  
});