import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class LoginFormComponent extends BaseComponent {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    const root = page.locator('.login_wrapper');
    super(page, root);

    this.usernameInput = this.root.locator('[data-test="username"]');
    this.passwordInput = this.root.locator('[data-test="password"]');
    this.loginButton = this.root.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async expectErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectErrorToContainText(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }
}