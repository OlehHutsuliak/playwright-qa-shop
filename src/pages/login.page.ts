import { type Locator, type Page } from '@playwright/test';

export class Login {
  readonly page: Page;
  readonly logo: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton;
  readonly errorMessage: Locator;
  readonly closeValidationMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.login_logo');
    this.usernameField = page.getByPlaceholder('Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('.error-message-container');
    this.closeValidationMessageButton = this.errorMessage.getByRole('button');
  }

  async provideUserName(userName: string) {
    await this.usernameField.fill(userName);
  }

  async provideUserPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async pressLoginButton() {
    await this.loginButton.click();
  }

  async authenticateUser(userName: string, password: string) {
    await this.provideUserName(userName);
    await this.provideUserPassword(password);
    await this.pressLoginButton();
  }

  async closeValidationMessage() {
    await this.closeValidationMessageButton.click();
  }
}
