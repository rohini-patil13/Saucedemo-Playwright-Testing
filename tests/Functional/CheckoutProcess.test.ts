import { test, expect } from '@playwright/test';
import { BaseTest } from '../../utils/BaseTest';
import { Assertion } from '../../utils/Assertion';
import { SaucedemoURLS } from '../../utils/Constants';
import { EnvReader as env } from '../../utils/EnvReader';
import errorMessages from '../../testData/errorMessages.json';
import checkoutInfo from '../../testData/checkoutData.json';

let app: BaseTest;


test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    app = new BaseTest(page);
    await test.step('Login as standard user and navigate to inventory', async () => {
      await app.loginPage.navigate(env.baseUrl);
      await app.loginPage.login(env.standardUser, env.password);
      await Assertion.assertPage(page, SaucedemoURLS.INVENTORY, await app.inventoryPage.getInventoryPageSubtitle());
    });
  });

  test('Complete checkout with valid info', async ({ page }) => {
    await test.step('Add a product and proceed to checkout', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.header.clickCartButton();;
      await app.cartPage.clickCheckout();
    });

    await test.step('Fill valid checkout information and finish order', async () => {
      await app.checkoutInfoPage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
      await app.checkoutInfoPage.clickContinue();
      await app.checkoutOverviewPage.clickFinish();
      await Assertion.assertPage(page, SaucedemoURLS.CHECKOUT_COMPLETE, app.checkoutConfirmationPage.getCheckoutSubtitle());
    });
  });

  test('Attempt checkout with blank fields', async () => {
    await test.step('Add a product and proceed to checkout', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.header.clickCartButton();;
      await app.cartPage.clickCheckout();
    });

    await test.step('Leave all fields blank and verify error message', async () => {
      await app.checkoutInfoPage.clickContinue();
      await app.checkoutInfoPage.assertErrorMessage(errorMessages.firstNameRequired);
    });
  });

  test('Enter very long names and postal code', async () => {
    const longString = 'A'.repeat(300);

    await test.step('Add a product and proceed to checkout', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.header.clickCartButton();;
      await app.cartPage.clickCheckout();
    });

    await test.step('Fill very long names and postal code', async () => {
      await app.checkoutInfoPage.fillCheckoutInformation(longString, longString, longString);
      await app.checkoutInfoPage.clickContinue();
      await expect(app.checkoutOverviewPage.isCheckoutOverviewPageVisible()).toBeTruthy(); 
    });
  });

  test('Enter special characters in checkout fields', async () => {
    const specialCharString = '!@#$%^&*()_+{}:"<>?`~';

    await test.step('Add a product and proceed to checkout', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.header.clickCartButton();
      await app.cartPage.clickCheckout();
    });

    await test.step('Fill fields with special characters and attempt to continue', async () => {
      await app.checkoutInfoPage.fillCheckoutInformation(specialCharString, specialCharString, specialCharString);
      await app.checkoutInfoPage.clickContinue();
      await expect(app.checkoutOverviewPage.isCheckoutOverviewPageVisible()).toBeTruthy(); 
    });
  });

  test('Checkout missing Postal Code triggers error message', async () => {
    await test.step('Add a product and proceed to checkout', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.header.clickCartButton();
      await app.cartPage.clickCheckout();
    });

    await test.step('Leave Postal Code blank and verify error message', async () => {
      await app.checkoutInfoPage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, '');
      await app.checkoutInfoPage.clickContinue();
      await app.checkoutInfoPage.assertErrorMessage(errorMessages.postalCodeRequired);
    });
  });

  test('Checkout missing First Name triggers error message', async () => {
    await test.step('Add a product and proceed to checkout', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.header.clickCartButton();;
      await app.cartPage.clickCheckout();
    });

    await test.step('Leave First Name blank and verify error message', async () => {
      await app.checkoutInfoPage.fillCheckoutInformation('', checkoutInfo.lastName, checkoutInfo.zipCode);
      await app.checkoutInfoPage.clickContinue();
      await app.checkoutInfoPage.assertErrorMessage(errorMessages.firstNameRequired);
    });
  });
});
