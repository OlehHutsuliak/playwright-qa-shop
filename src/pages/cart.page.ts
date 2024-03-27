import { expect, type Locator, type Page } from '@playwright/test';
import { Home } from './home.page';

export class Cart extends Home {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly cartItem: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.continueShoppingButton = page.locator('data-test="continue-shopping"');
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async goToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }
}
