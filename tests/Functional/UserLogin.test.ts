import { Page, test, expect } from '@playwright/test';
import { EnvReader as env } from '../../utils/EnvReader';
import { BaseTest } from '../../utils/BaseTest';
import { Assertion } from '../../utils/Assertion';
import { SaucedemoURLS } from '../../utils/Constants';
import errorMessage from '../../testData/errorMessages.json';

const usernames = [
  env.standardUser,
  env.problemUser,
  env.performanceGlitchUser,
  env.errorUser,
  env.visualUser
];
const baseURL = env.baseUrl;
const invalidUsername = 'invalid_user';
let app: BaseTest;

test.beforeEach(async ({ page }) => {
    app = new BaseTest(page);
    await test.step('Navigate to the login page', async () => {
        await app.loginPage.navigate(baseURL);
    });
});

test.describe('Login tests with valid credentials', () => {

    usernames.forEach((username) => {
      test(`Login with valid credentials: ${username}`, async ({page}) => {
        await test.step(`Login with username: ${username}`, async () => {
            await app.loginPage.login(username, env.password);
        });
  
        await test.step('Verify successful login', async () => {
            const inventoryPageTitle = app.inventoryPage.getInventoryPageSubtitle();
            await Assertion.assertPage(page, SaucedemoURLS.INVENTORY, inventoryPageTitle);
        });
      });
    });

  });

  test.describe('Login tests with invalid or missing credentials', () => {

    test('Login with invalid username/password', async ({ page }) => {
      await test.step('Login with invalid credentials', async () => {
        await app.loginPage.login(invalidUsername, env.password);
      });
  
      await test.step('Verify error message for invalid login', async () => {
        await app.loginPage.validateLoginErrorMessage(errorMessage.invalidCreds);
      });
    });
  
    test('Login with blank username and password', async ({ page }) => {
      await test.step('Leave username and password blank and click login', async () => {
        await app.loginPage.login('', '');
      });
  
      await test.step('Verify error message for blank fields', async () => {
        await app.loginPage.validateLoginErrorMessage(errorMessage.usernameRequired);
      });
    });
  
    test('Login with username containing special characters or spaces', async ({ page }) => {
      const specialUsername = 'user _@example>';
      await test.step('Login with username containing special characters', async () => {
        await app.loginPage.login(specialUsername, env.password);
      });
  
      await test.step('Verify error message for invalid username format', async () => {
        await app.loginPage.validateLoginErrorMessage(errorMessage.invalidCreds2);
      });
    });
  
    test('Login with locked-out user', async ({ page }) => {
      await test.step('Login with locked-out user', async () => {
        await app.loginPage.login(env.lockedOutUser, env.password);
      });
  
      await test.step('Verify error message for locked-out user', async () => {
        await app.loginPage.validateLoginErrorMessage(errorMessage.lockedOutUser);
      });
    });
  
});





