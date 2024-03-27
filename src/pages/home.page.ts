import { type Locator, type Page, expect } from '@playwright/test';
import { Base } from './base.page';
import { SideBar, FilterOptions } from '../enums';

export class Home extends Base {
  readonly page: Page;
  readonly filter: Locator;
  readonly productList: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.filter = page.locator('.product_sort_container');
    this.productList = page.locator('.inventory_list');
  }

  async isUserLoggedIn(status: boolean) {
    if (status) {
      await expect(this.page).toHaveURL(/inventory/);
      await expect(this.title).toContainText('Products');
    } else {
      await expect(this.page).toHaveURL(process.env.BASE_URL!);
    }
  }

  async logout() {
    await this.burgerButton.click();
    await this.page.getByText(SideBar.Logout).click();
  }

  async filterProducts(filterOption: FilterOptions) {
    await this.filter.click();
    await this.filter.selectOption(filterOption);
  }

  async addProductToCart(productName: string) {
    const productItem = this.page.locator(this.productItemSelector, { hasText: productName });
    const button = productItem.locator(this.addToCartButton);
    await button.click();
  }

  async openProductDetails(productName: string) {
    await this.product.getByText(productName).click();
  }

  async removeProductFromCart(productName: string) {
    const productToRemove = this.page.locator(this.productItemSelector, { hasText: productName });
    await productToRemove.locator(this.removeButtonSelector).click();
  }
}
