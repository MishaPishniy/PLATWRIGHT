import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { CartItemComponent } from '../components/CartItemComponent';
import { routes } from '../constants/routes';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly cartList: Locator;
  readonly checkoutButton: Locator;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);

    this.title = page.locator('[data-test="title"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');

    this.header = new HeaderComponent(page);
  }

  async openCartPage() {
    await this.open(routes.cart);
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.title).toHaveText('Your Cart');
    await expect(this.cartList).toBeVisible();
  }

  cartItem(productName: string): CartItemComponent {
    return new CartItemComponent(this.page, productName);
  }

  async expectProductInCart(productName: string) {
    await this.cartItem(productName).expectVisible();
  }

  async removeProduct(productName: string) {
    await this.cartItem(productName).remove();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}