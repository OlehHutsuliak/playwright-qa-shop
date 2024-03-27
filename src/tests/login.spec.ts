import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { faker } from '@faker-js/faker';
import { buildLoginValidationMsg } from '../helpers/utils';
import { ValidationMessage } from '../enums';

test('Successful login using valid credentials', async ({ loginPage, homePage }) => {
  const userName = process.env.USERNAME as string;
  const userPassword = process.env.PASSWORD as string;

  await loginPage.authenticateUser(userName, userPassword);
  await homePage.isUserLoggedIn(true);
});

test('Denied access with invalid credentials', async ({ loginPage, homePage }) => {
  const userName = faker.internet.userName();
  const userPassword = faker.internet.password();
  const expectedValidationMsg = buildLoginValidationMsg('login', ValidationMessage.InvalidCredentials);

  await loginPage.authenticateUser(userName, userPassword);
  await expect(loginPage.errorMessage).toHaveText(expectedValidationMsg);
});

test('Denied access with locked out user credentials', async ({ loginPage, homePage }) => {
  const userName = 'locked_out_user';
  const userPassword = 'secret_sauce';
  const expectedValidationMsg = buildLoginValidationMsg('login', ValidationMessage.LockedOutUser);

  await loginPage.authenticateUser(userName, userPassword);
  await expect(loginPage.errorMessage).toHaveText(expectedValidationMsg);
});

test('Validation error message when the username field is left empty', async ({ loginPage, homePage }) => {
  const expectedUserNameValidationMsg = buildLoginValidationMsg('login', ValidationMessage.EmptyUserName);

  await loginPage.pressLoginButton();
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(expectedUserNameValidationMsg);
});

test('Validation error message when the password field is left empty', async ({ loginPage, homePage }) => {
  const userName = faker.internet.userName();
  const expectedPasswordValidationMsg = buildLoginValidationMsg('login', ValidationMessage.EmptyPassword);

  await loginPage.provideUserName(userName);
  await loginPage.pressLoginButton();
  await expect(loginPage.errorMessage).toHaveText(expectedPasswordValidationMsg);
});

test('Successful logout from the user account', async ({ loginPage, homePage }) => {
  const userName = process.env.USERNAME as string;
  const userPassword = process.env.PASSWORD as string;

  await loginPage.authenticateUser(userName, userPassword);
  await homePage.isUserLoggedIn(true);
  await homePage.logout();
  await homePage.isUserLoggedIn(false);
});
