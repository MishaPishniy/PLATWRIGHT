import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginFormComponent } from '../components/LoginFormComponent';
import { routes } from '../constants/routes';

export class LoginPage extends BasePage {
  readonly logo: Locator;
  readonly loginForm: LoginFormComponent;

  constructor(page: Page) {
    super(page);

    this.logo = page.locator('.login_logo');
    this.loginForm = new LoginFormComponent(page);
  }

  async openLoginPage() {
    await this.open(routes.login);
  }

  async expectOpened() {
    await expect(this.logo).toHaveText('Swag Labs');
  }
}