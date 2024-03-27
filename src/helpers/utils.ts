import { ProductDetails, ValidationMessage } from '../enums';
import { type Locator, type Page } from '@playwright/test';

export const buildLoginValidationMsg = (page: 'login' | 'checkout', message: ValidationMessage) => {
  if (page === 'login') return `Epic sadface: ${message}`;
  return `Error: ${message}`;
};

export const getItemsProperty = async (productItem: Locator, selector: string): Promise<string[]> => {
  const productsProperties: string[] = [];
  const products = await productItem.all();

  for (let item = 0; item < products.length; item++) {
    const name = (await products[item].locator(selector).textContent()) as string;
    productsProperties.push(name);
  }

  return productsProperties;
};

export const getItemButtonValue = async (productLocator: Locator, productName: string): Promise<string> => {
  const product = await productLocator.filter({ hasText: productName }).getByRole('button').textContent();
  return product!;
};

export const sortProperty = async (
  array: string[],
  sortBy: ProductDetails,
  order: 'ASC' | 'DESC'
): Promise<string[]> => {
  if (sortBy === ProductDetails.Price) {
    const numericPrices = array.map((price) => parseFloat(price.replace('$', '')));

    if (order === 'ASC') {
      numericPrices.sort((a, b) => a - b);
    } else if (order === 'DESC') {
      numericPrices.sort((a, b) => b - a);
    }

    const sortedPrices: string[] = numericPrices.map((price) => `$${price.toFixed(2)}`);

    return sortedPrices as string[];
  }

  if (sortBy === ProductDetails.Name && order === 'ASC') {
    array.sort();
  } else if (sortBy === ProductDetails.Name && order === 'DESC') {
    array.sort().reverse();
  }

  return array;
};
