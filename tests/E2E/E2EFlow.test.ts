import { test, expect } from '@playwright/test';
import { BaseTest } from '../../utils/BaseTest';
import { Assertion } from '../../utils/Assertion';
import { SaucedemoURLS } from '../../utils/Constants';
import { EnvReader as env } from '../../utils/EnvReader';
import checkoutInfo from '../../testData/checkoutData.json'


let app: BaseTest;

test.describe('E2E Checkout Flow - Standard User', { tag: '@E2E' }, () => {
  test.beforeEach(async ({ page }) => {
    app = new BaseTest(page);
    await app.loginPage.navigate(env.baseUrl);
    await app.loginPage.login(env.standardUser, env.password);
    const inventoryPageTitle = app.inventoryPage.getInventoryPageSubtitle();
    await Assertion.assertPage(page, SaucedemoURLS.INVENTORY, inventoryPageTitle);
  });

  test('End-To-End Testing: Login -> Add to Cart -> Checkout -> Finish -> Logout', async ({ page }) => {
    
    await test.step('Add a product to cart', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.inventoryPage.assertCartBadgeCount(1);
    });

    await test.step('Go to cart and verify item', async () => {
        await app.header.clickCartButton();;
        await Assertion.assertPage(page, SaucedemoURLS.CART,app.cartPage.getCartSubtitle());
      await app.inventoryPage.assertCartBadgeCount(1);
    });

    await test.step('Proceed to checkout', async () => {
      await app.cartPage.clickCheckout();
      await Assertion.assertPage(page, SaucedemoURLS.CHECKOUT, app.checkoutInfoPage.getCheckoutSubtitle());
    });

    await test.step('Enter checkout information and continue', async () => {
      await app.checkoutInfoPage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
      await app.checkoutInfoPage.clickContinue();
      await Assertion.assertPage(page, SaucedemoURLS.CHECKOUT_TWO,app.checkoutOverviewPage.getcheckoutSubtitle());
    });

    await test.step('Finish the checkout process', async () => {
      await app.checkoutOverviewPage.clickFinish();
      await Assertion.assertPage(page, SaucedemoURLS.CHECKOUT_COMPLETE,app.checkoutConfirmationPage.getCheckoutSubtitle());
      const thankYouHeader = await app.checkoutConfirmationPage.getConfirmationHeader();
      expect(thankYouHeader).toHaveText(checkoutInfo.confirmationHeaderText);
    });

    await test.step('Logout after completing order', async () => {
      await app.header.clickMenuButton();
      await app.header.clickMenuItemLogout();
      await Assertion.assertPage(page, SaucedemoURLS.BASE_URL,app.loginPage.getLoginPageHeader());
    });

  });
});
