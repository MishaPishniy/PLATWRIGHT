import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { ProductCardComponent } from '../components/ProductCardComponent';
import { routes } from '../constants/routes';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly inventoryContainer: Locator;
  readonly sortDropdown: Locator;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);

    this.title = page.locator('[data-test="title"]');
    this.inventoryContainer = page.locator('.inventory_container');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    this.header = new HeaderComponent(page);
  }

  async openInventoryPage() {
    await this.open(routes.inventory);
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryContainer).toBeVisible();
  }

  product(productName: string): ProductCardComponent {
    return new ProductCardComponent(this.page, productName);
  }

  async expectProductVisible(productName: string) {
    await this.product(productName).expectVisible();
  }

  async addProductToCart(productName: string) {
    await this.product(productName).addToCart();
  }

  async removeProductFromCart(productName: string) {
    await this.product(productName).removeFromCart();
  }

  async sortProductsBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }
}