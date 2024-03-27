import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { faker } from '@faker-js/faker';
import { buildLoginValidationMsg, getItemsProperty } from '../helpers/utils';
import { ValidationMessage } from '../enums';
import { AUTHENTICATED_USER_STATE } from '../../playwright.config';

test.use({ storageState: AUTHENTICATED_USER_STATE });

test.describe('Checkout personal data fields validation', () => {
  const product1 = 'Sauce Labs Fleece Jacket';

  test('FirstName field validation', async ({ homePage, cartPage, checkoutPage }) => {
    const expectedValidationMsg = buildLoginValidationMsg('checkout', ValidationMessage.EmptyFirstName);

    await homePage.addProductToCart(product1);
    await homePage.openCart();
    await cartPage.goToCheckout();

    await checkoutPage.proceedToSecondCheckoutStep();
    const errorMessage = await checkoutPage.errorMessage.textContent();
    expect(errorMessage).toEqual(expectedValidationMsg);
  });

  test('LastName field validation', async ({ homePage, cartPage, checkoutPage }) => {
    const expectedValidationMsg = buildLoginValidationMsg('checkout', ValidationMessage.EmptyLastName);
    const userFirstName = faker.person.firstName();

    await homePage.addProductToCart(product1);
    await homePage.openCart();
    await cartPage.goToCheckout();

    await checkoutPage.provideFirstName(userFirstName);
    await checkoutPage.proceedToSecondCheckoutStep();
    const errorMessage = await checkoutPage.errorMessage.textContent();
    expect(errorMessage).toEqual(expectedValidationMsg);
  });

  test('ZipCode field validation', async ({ homePage, cartPage, checkoutPage }) => {
    const expectedValidationMsg = buildLoginValidationMsg('checkout', ValidationMessage.EmptyZipCode);
    const userFirstName = faker.person.firstName();
    const userLastName = faker.person.lastName();

    await homePage.addProductToCart(product1);
    await homePage.openCart();
    await cartPage.goToCheckout();

    await checkoutPage.provideFirstName(userFirstName);
    await checkoutPage.provideLastName(userLastName);
    await checkoutPage.proceedToSecondCheckoutStep();
    const errorMessage = await checkoutPage.errorMessage.textContent();
    expect(errorMessage).toEqual(expectedValidationMsg);
  });
});

test('Checkout cart overview correctness', async ({ homePage, cartPage, checkoutPage }) => {
  const product1Name = 'Sauce Labs Fleece Jacket';
  const product2Name = 'Sauce Labs Onesie';
  const expectedCartItem1 = { name: product1Name, price: '49.99', quantity: '1' };
  const expectedCartItem2 = { name: product2Name, price: '7.99', quantity: '1' };

  const userFirstName = faker.person.firstName();
  const userLastName = faker.person.lastName();
  const userZipCode = faker.location.zipCode();

  await homePage.addProductToCart(product1Name);
  await homePage.addProductToCart(product2Name);

  await homePage.openCart();
  await cartPage.goToCheckout();
  await checkoutPage.provideUserInformation(userFirstName, userLastName, userZipCode);
  await checkoutPage.proceedToSecondCheckoutStep();

  const cartItem1Details = await checkoutPage.getCartItemDetails(product1Name);
  const cartItem2Details = await checkoutPage.getCartItemDetails(product2Name);

  expect(cartItem1Details).toEqual(expectedCartItem1);
  expect(cartItem2Details).toEqual(expectedCartItem2);
});

test('Order confirmation message upon cart overview confirmation', async ({ homePage, cartPage, checkoutPage }) => {
  const product1Name = 'Sauce Labs Fleece Jacket';
  const expectedCompleteMessage = 'Thank you for your order!';

  const userFirstName = faker.person.firstName();
  const userLastName = faker.person.lastName();
  const userZipCode = faker.location.zipCode();

  await homePage.addProductToCart(product1Name);

  await homePage.openCart();
  await cartPage.goToCheckout();
  await checkoutPage.provideUserInformation(userFirstName, userLastName, userZipCode);
  await checkoutPage.proceedToSecondCheckoutStep();
  await checkoutPage.confirmOrder();

  const completeMessage = await checkoutPage.completeHeader.textContent();

  expect(completeMessage).toEqual(expectedCompleteMessage);
  await expect(checkoutPage.backHomeButton).toBeVisible();
});
