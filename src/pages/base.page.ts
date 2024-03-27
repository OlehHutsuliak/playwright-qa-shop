import { type Locator, type Page } from '@playwright/test';

export class Base {
  readonly page: Page;
  readonly title: Locator;
  readonly burgerButton: Locator;
  readonly sidebarMenu: Locator;
  readonly closeBurgerMenuButton: Locator;
  readonly cart: Locator;
  readonly product: Locator;
  readonly productName: Locator;
  readonly productDesc: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly shoppingCartBadge: Locator;

  // Selectors below are used by the function that fetches the product's details.
  readonly productItemSelector = '[class$=_item]';
  readonly productNameSelector = '[class^="inventory_"][class*="_name"]';
  readonly productDescSelector = '[class^="inventory_"][class*="_desc"]';
  readonly productPriceSelector = '[class^="inventory_"][class*="_price"]';
  readonly shoppingCartBadgeSelector = '.shopping_cart_badge';
  readonly productButtonSelector = '.btn';
  readonly removeButtonSelector = '[id^="remove"]';

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.header_secondary_container .title');
    this.burgerButton = page.locator('.bm-burger-button');
    this.sidebarMenu = page.locator('.bm-menu-wrap');
    this.closeBurgerMenuButton = page.locator('.bm-cross-button');
    this.cart = page.locator('.shopping_cart_container');
    this.product = page.locator(this.productItemSelector);
    this.productName = page.locator(this.productDescSelector);
    this.productDesc = page.locator(this.productDescSelector);
    this.productPrice = page.locator(this.productPriceSelector);
    this.addToCartButton = page.locator('[id^="add-to-cart"]');
    this.removeFromCartButton = page.locator(this.removeButtonSelector);

    this.shoppingCartBadge = page.locator(this.shoppingCartBadgeSelector);
  }

  async openCart() {
    await this.cart.click();
  }
}
