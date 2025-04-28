import { test, expect } from '@playwright/test';
import { BaseTest } from '../../utils/BaseTest';
import { Assertion } from '../../utils/Assertion';
import { EnvReader as env } from '../../utils/EnvReader';
import { SaucedemoURLS } from '../../utils/Constants';

let app: BaseTest;
const baseURL = env.baseUrl;
const username = env.standardUser; 

test.describe('Cart Management', () => {

  test.beforeEach(async ({ page }) => {
    app = new BaseTest(page);
    await app.loginPage.navigate(baseURL);
    await app.loginPage.login(username, env.password);
    const inventoryPageTitle = app.inventoryPage.getInventoryPageSubtitle();
    await Assertion.assertPage(page, SaucedemoURLS.INVENTORY, inventoryPageTitle);
  });

  test('Add all available items to cart and verify cart badge', async ({ page }) => {
    await test.step('Add all products to cart', async () => {
      const allProducts = app.inventoryPage.getAllProductAddButtons();
      const productCount = await allProducts.count();

      for (let i = 0; i < productCount; i++) {
        await app.inventoryPage.addItemToCart(i);
      }
    });

    await test.step('Verify the cart badge displays the total number of products added', async () => {
      const allProducts = app.inventoryPage.getAllProductAddButtons();
      const totalCount = await allProducts.count();
      console.log(totalCount)
      await app.inventoryPage.assertCartBadgeCount(totalCount);
    });
  });

  test('Remove all items from cart and verify cart is empty', async ({ page }) => {
    await test.step('Add all products to the cart and then remove them', async () => {
      const allProducts = app.inventoryPage.getAllProductAddButtons();
      const productCount = await allProducts.count();

      for (let i = 0; i < productCount; i++) {
        await app.inventoryPage.addItemToCart(i);
      }

      for (let i = 0; i < productCount; i++) {
        await app.inventoryPage.removeItemFromCart(i);
      }
    });

    await test.step('Verify cart badge is not visible (empty)', async () => {
      await app.inventoryPage.assertCartBadgeCount(0);
    });

    await test.step('Navigate to cart page and verify no products are present', async () => {
      await app.header.clickCartButton();
      await app.cartPage.validateCartPageLoaded();
      await app.inventoryPage.assertCartBadgeCount(0);
    });
  });

  test('Add item, Logout, Login → Verify cart is reset', async ({ page }) => {
    await test.step('Add a product to cart', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.inventoryPage.assertCartBadgeCount(1);
    });

    await test.step('Logout from the application', async () => {
      await app.header.clickMenuButton();
      await app.header.clickMenuItemLogout();
      await app.loginPage.validateLoginPage();
    });

    await test.step('Login again and verify cart is empty', async () => {
      await app.loginPage.login(username, env.password);
      const inventoryPageTitle = app.inventoryPage.getInventoryPageSubtitle();
      await Assertion.assertPage(page, SaucedemoURLS.INVENTORY, inventoryPageTitle);
      await app.inventoryPage.assertCartBadgeCount(0);
    });
  });

  test.afterEach(async () => {
    await test.step('Reset the application state and logout', async () => {
      await app.header.clickMenuButton();
      await app.header.clickMenuItemResetAppState();
      await app.header.clickMenuItemLogout();
      await app.loginPage.validateLoginPage();
    });
  });

});
