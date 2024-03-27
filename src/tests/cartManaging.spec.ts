import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { getItemsProperty, getItemButtonValue } from '../helpers/utils';
import { AUTHENTICATED_USER_STATE } from '../../playwright.config';

test.use({ storageState: AUTHENTICATED_USER_STATE });

test.describe('Adding product to Cart', () => {
  const product1Name = 'Sauce Labs Backpack';
  const product2Name = 'Sauce Labs Bike Light';

  test('Add products to Cart', async ({ homePage, cartPage }) => {
    const expectedCartBadgeNumber = '2';
    const expectedNumberOfProductsInCart = 2;

    await homePage.addProductToCart(product1Name);
    await homePage.addProductToCart(product2Name);
    await homePage.openCart();

    const [cartBadgeNumber] = await getItemsProperty(homePage.cart, homePage.shoppingCartBadgeSelector);
    const productNames = await getItemsProperty(cartPage.cartItem, cartPage.productNameSelector);

    expect(cartBadgeNumber).toEqual(expectedCartBadgeNumber);
    await expect(cartPage.cartItem).toHaveCount(expectedNumberOfProductsInCart);
    expect(productNames).toEqual([product1Name, product2Name]);
  });

  test('Add Products from Product Details Page:', async ({ homePage, productDetailsPage, cartPage }) => {
    const expectedCartBadgeNumber = '1';
    const expectedNumberOfProductsInCart = 1;

    await homePage.openProductDetails(product1Name);
    await productDetailsPage.addProductToCart();
    await homePage.openCart();

    const [cartBadgeNumber] = await getItemsProperty(homePage.cart, homePage.shoppingCartBadgeSelector);
    const productNames = await getItemsProperty(cartPage.cartItem, cartPage.productNameSelector);

    expect(cartBadgeNumber).toEqual(expectedCartBadgeNumber);
    await expect(cartPage.cartItem).toHaveCount(expectedNumberOfProductsInCart);
    expect(productNames).toEqual([product1Name]);
  });
});

test.describe('Removing product from Cart', () => {
  const product1 = 'Sauce Labs Fleece Jacket';
  const product2 = 'Sauce Labs Onesie';
  const product3 = 'Sauce Labs Bike Light';
  const expectedProductButtonValue = 'Add to cart';

  test('User can remove a product while being on Home Page', async ({ homePage, cartPage }) => {
    await homePage.addProductToCart(product1);
    await homePage.addProductToCart(product2);
    await homePage.addProductToCart(product3);

    await homePage.removeProductFromCart(product1);
    const [cartBadgeNumberFirstRemoval] = await getItemsProperty(homePage.cart, homePage.shoppingCartBadgeSelector);
    const productBtnValueFirstRemovalHomePage = await getItemButtonValue(homePage.product, product1);
    await homePage.openCart();
    const productsLeftInCart = await getItemsProperty(cartPage.cartItem, cartPage.productNameSelector);

    expect(cartBadgeNumberFirstRemoval).toBe('2');
    expect(productBtnValueFirstRemovalHomePage).toBe(expectedProductButtonValue);
    expect(productsLeftInCart).toEqual([product2, product3]);
  });

  test('User can remove a product while being on Product Details Page', async ({
    homePage,
    productDetailsPage,
    cartPage,
  }) => {
    await homePage.addProductToCart(product1);
    await homePage.addProductToCart(product2);
    await homePage.addProductToCart(product3);

    //Remove first product
    await homePage.openProductDetails(product1);
    await productDetailsPage.removeProductFromCart();
    const [cartBadgeNumberFirstRemoval] = await getItemsProperty(homePage.cart, homePage.shoppingCartBadgeSelector);

    await productDetailsPage.backToHomePage();

    //Remove second product
    await homePage.openProductDetails(product2);
    await productDetailsPage.removeProductFromCart();
    const [cartBadgeNumberSecondRemoval] = await getItemsProperty(homePage.cart, homePage.shoppingCartBadgeSelector);

    await productDetailsPage.openCart();

    const productsInCart = await getItemsProperty(cartPage.cartItem, cartPage.productNameSelector);

    expect(cartBadgeNumberFirstRemoval).toBe('2');
    expect(cartBadgeNumberSecondRemoval).toBe('1');
    expect(productsInCart).toEqual([product3]);
  });

  test('User can remove a product while being on Cart Page', async ({ homePage, productDetailsPage, cartPage }) => {
    const expectedCartBadgeNumber = '1';

    await homePage.addProductToCart(product1);
    await homePage.addProductToCart(product2);
    await homePage.addProductToCart(product3);

    await homePage.openCart();

    await cartPage.removeProductFromCart(product3);
    await cartPage.removeProductFromCart(product1);

    const [cartBadgeNumber] = await getItemsProperty(homePage.cart, homePage.shoppingCartBadgeSelector);
    const productsInCart = await getItemsProperty(cartPage.cartItem, cartPage.productNameSelector);

    expect(productsInCart).toEqual([product2]);
    expect(cartBadgeNumber).toBe(expectedCartBadgeNumber);
  });
});
