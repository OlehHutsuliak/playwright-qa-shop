import { type Page, test as base } from '@playwright/test';
import { Login } from './pages/login.page';
import { Home } from './pages/home.page';
import { Cart } from './pages/cart.page';
import { Checkout } from './pages/checkout.page';
import { ProductDetails } from './pages/productDetails.page';

interface Fixtures {
  loginPage: Login;
  homePage: Home;
  cartPage: Cart;
  productDetailsPage: ProductDetails;
  checkoutPage: Checkout;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(process.env.BASE_URL!);
    const loginPage = new Login(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new Home(page);
    await page.goto(process.env.BASE_URL! + '/inventory.html');
    await use(homePage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new Cart(page);
    await use(cartPage);
  },
  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetails(page);
    await use(productDetailsPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new Checkout(page);
    await use(checkoutPage);
  },
});
