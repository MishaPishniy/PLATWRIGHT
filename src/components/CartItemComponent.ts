import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class CartItemComponent extends BaseComponent {
  readonly name: Locator;
  readonly price: Locator;
  readonly removeButton: Locator;

  constructor(page: Page, productName: string) {
    const root = page
      .locator('.cart_item')
      .filter({ hasText: productName });

    super(page, root);

    this.name = this.root.locator('[data-test="inventory-item-name"]');
    this.price = this.root.locator('[data-test="inventory-item-price"]');
    this.removeButton = this.root.getByRole('button', { name: 'Remove' });
  }

  async expectVisible() {
    await expect(this.root).toBeVisible();
  }

  async expectPriceVisible() {
    await expect(this.price).toBeVisible();
  }

  async remove() {
    await this.removeButton.click();
  }
}