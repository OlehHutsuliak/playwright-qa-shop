import { test as setup } from 'fixtures';
import { AUTHENTICATED_USER_STATE } from '../../playwright.config';

setup('Authenticate user', async ({ loginPage, page }) => {
  const userName = process.env.USERNAME as string;
  const userPassword = process.env.PASSWORD as string;

  await loginPage.authenticateUser(userName, userPassword);
  await page.context().storageState({ path: AUTHENTICATED_USER_STATE });
});
