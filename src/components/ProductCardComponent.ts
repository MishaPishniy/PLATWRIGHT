import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class ProductCardComponent extends BaseComponent {
  readonly name: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page, productName: string) {
    const root = page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    super(page, root);

    this.name = this.root.locator('[data-test="inventory-item-name"]');
    this.price = this.root.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = this.root.getByRole('button', { name: 'Add to cart' });
    this.removeButton = this.root.getByRole('button', { name: 'Remove' });
  }

  async expectVisible() {
    await expect(this.root).toBeVisible();
  }

  async expectPriceVisible() {
    await expect(this.price).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }
}