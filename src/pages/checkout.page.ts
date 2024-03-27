import { type Locator, type Page } from '@playwright/test';
import { Base } from './base.page';

interface CartItemDetails {
  name: string;
  price: string;
  quantity: string;
}

export class Checkout extends Base {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly zipCodeField: Locator;
  readonly errorMessageContainer: Locator;
  readonly closeErrorMessageButton: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly backHomeButton: Locator;
  readonly errorMessage: Locator;
  readonly completeHeader: Locator;

  readonly cartQuantity = '.cart_quantity';

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.firstNameField = page.locator('#first-name');
    this.lastNameField = page.locator('#last-name');
    this.zipCodeField = page.locator('#postal-code');
    this.errorMessageContainer = page.locator('.error-message-container');
    this.closeErrorMessageButton = this.errorMessageContainer.getByRole('button');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.errorMessage = page.locator('.error-message-container');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async provideFirstName(firstName: string) {
    await this.firstNameField.fill(firstName);
  }

  async provideLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  async provideZipCode(zipCode: string) {
    await this.zipCodeField.fill(zipCode);
  }

  async provideUserInformation(firstName: string, lastName: string, zipCode: string) {
    await this.provideFirstName(firstName);
    await this.provideLastName(lastName);
    await this.provideZipCode(zipCode);
  }

  async proceedToSecondCheckoutStep() {
    await this.continueButton.click();
  }

  async confirmOrder() {
    await this.finishButton.click();
  }

  async backToHome() {
    await this.backHomeButton.click();
  }

  async getCartItemDetails(productName: string): Promise<CartItemDetails> {
    const product = this.product.filter({ hasText: productName });
    const name = (await product.locator(this.productNameSelector).textContent()) as string;
    const price = (await product.locator(this.productPriceSelector).textContent())!.replace('$', '');
    const quantity = (await product.locator(this.cartQuantity).textContent()) as string;

    return { name, price, quantity };
  }
}
