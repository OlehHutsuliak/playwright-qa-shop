import { type Locator, type Page } from '@playwright/test';
import { Home } from './home.page';

export class ProductDetails extends Home {
  readonly page: Page;
  readonly backToProductsButton: Locator;
  readonly product: Locator;

  readonly productSelector = '.inventory_details_desc_container';

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.backToProductsButton = page.locator('#back-to-products');
    this.product = page.locator('.inventory_details_desc_container');
  }

  async backToHomePage() {
    await this.backToProductsButton.click();
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async removeProductFromCart() {
    await this.removeFromCartButton.click();
  }
}
