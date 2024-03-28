import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { sortProperty, getItemsProperty } from '../helpers/utils';
import { FilterOptions, ProductDetails } from '../enums';
import { AUTHENTICATED_USER_STATE } from '../../playwright.config';

test.use({ storageState: AUTHENTICATED_USER_STATE });

test('Default products number display on Home Page', async ({ homePage }) => {
  const expectedNumberOfProducts = 6;
  await expect(homePage.product).toHaveCount(expectedNumberOfProducts);
});

test.describe('Products filtering', () => {
  test('Filter Products by Name ASC', async ({ homePage }) => {
    const productsNames = await getItemsProperty(homePage.product, homePage.productNameSelector);
    const expectedFilteredProductsNames = await sortProperty(productsNames, ProductDetails.Name, 'ASC');

    await homePage.filterProducts(FilterOptions.NameAtoZ);
    const filteredProductNames = await getItemsProperty(homePage.product, homePage.productNameSelector);

    expect(filteredProductNames).toEqual(expectedFilteredProductsNames);
  });

  test('Filter products by Name DESC', async ({ homePage }) => {
    const productsNames = await getItemsProperty(homePage.product, homePage.productNameSelector);
    const expectedFilteredProductsNames = await sortProperty(productsNames, ProductDetails.Name, 'DESC');

    await homePage.filterProducts(FilterOptions.NameZtoA);
    const filteredProductNames = await getItemsProperty(homePage.product, homePage.productNameSelector);

    expect(filteredProductNames).toEqual(expectedFilteredProductsNames);
  });

  test('Filter products by Price ASC', async ({ homePage }) => {
    const productPrices = await getItemsProperty(homePage.product, homePage.productPriceSelector);
    const expectedFilteredProductsPrices = await sortProperty(productPrices, ProductDetails.Price, 'ASC');

    await homePage.filterProducts(FilterOptions.PriceLowToHigh);
    const filteredProductPrices = await getItemsProperty(homePage.product, homePage.productPriceSelector);

    expect(filteredProductPrices).toEqual(expectedFilteredProductsPrices);
  });

  test('Filter Products by Price DESC', async ({ homePage }) => {
    const productPrices = await getItemsProperty(homePage.product, homePage.productPriceSelector);
    const expectedFilteredProductsPrices = await sortProperty(productPrices, ProductDetails.Price, 'DESC');

    await homePage.filterProducts(FilterOptions.PriceHighToLow);
    const filteredProductPrices = await getItemsProperty(homePage.product, homePage.productPriceSelector);

    expect(filteredProductPrices).toEqual(expectedFilteredProductsPrices);
  });
});
