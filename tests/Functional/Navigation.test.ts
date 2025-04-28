import { test, expect } from '@playwright/test';
import { BaseTest } from '../../utils/BaseTest';
import { EnvReader as env } from '../../utils/EnvReader';
import { SaucedemoURLS } from '../../utils/Constants';
import { Assertion } from '../../utils/Assertion';

let app: BaseTest;

test.describe('Navigation and Session Management', () => {
  test.beforeEach(async ({ page }) => {
    app = new BaseTest(page);
    await app.loginPage.navigate(env.baseUrl);
    await app.loginPage.login(env.standardUser, env.password);
    const inventoryPageTitle = app.inventoryPage.getInventoryPageSubtitle();
    await Assertion.assertPage(page, SaucedemoURLS.INVENTORY, inventoryPageTitle);
  });

  test('Navigate via Side Menu options', async ({ page }) => {
    await test.step('Click on All Items and verify navigation', async () => {
      await app.header.clickMenuButton();
      await app.header.clickMenuItemAllItems();
      await expect(page).toHaveURL(SaucedemoURLS.INVENTORY);
    });

    await test.step('Click on About and verify external URL', async () => {
      await app.header.clickMenuButton();
      await app.header.clickMenuItemAbout();
      await expect(page).toHaveURL(/.*saucelabs\.com/); 
      await page.goBack();
    });

    await test.step('Click on Logout and verify return to login page', async () => {
      await app.header.clickMenuButton();
      await app.header.clickMenuItemLogout();
      await expect(page).toHaveURL(SaucedemoURLS.BASE_URL);
    });
  });

  test('Logout and check no session on browser back', async ({ page }) => {
    await test.step('Logout from side menu', async () => {
      await app.header.clickMenuButton();
      await app.header.clickMenuItemLogout();
      await expect(page).toHaveURL(SaucedemoURLS.BASE_URL);
    });

    await test.step('Use browser back and verify session is not regained', async () => {
      await page.goBack();
      await expect(page).toHaveURL(SaucedemoURLS.BASE_URL);
    });
  });

  test('Reset App State clears cart and session', async ({ page }) => {
    await test.step('Add items to cart', async () => {
      await app.inventoryPage.addItemToCart(0);
      await app.inventoryPage.addItemToCart(1);
      await app.inventoryPage.assertCartBadgeCount(2);
    });

    await test.step('Reset app state via side menu', async () => {
      await app.header.clickMenuButton();
      await app.header.clickMenuItemResetAppState();
      await app.inventoryPage.assertCartBadgeCount(0);
    });

    await test.step('Refresh page and verify cart remains empty', async () => {
      await page.reload();
      await app.inventoryPage.assertCartBadgeCount(0);

    });
  });

  test('Navigation using browser back and forward buttons', async ({ page }) => {
    await test.step('Click on first product to view details', async () => {
      await app.inventoryPage.getProductTitle(0).click();
      await expect(page).toHaveURL(/inventory-item\.html/);
    });

    await test.step('Use browser back and verify return to inventory', async () => {
      await page.goBack();
      await expect(page).toHaveURL(SaucedemoURLS.INVENTORY);
    });

    await test.step('Use browser forward and verify return to product detail', async () => {
      await page.goForward();
      await expect(page).toHaveURL(/inventory-item\.html/);
    });
  });

  test('Simulate session timeout by clearing storage', async ({ page }) => {
    await test.step('Manually clear local storage to simulate timeout', async () => {
      await page.context().clearCookies();
      await page.reload();
    });

    await test.step('Try accessing protected page after storage clear', async () => {
      await page.goto(SaucedemoURLS.INVENTORY);
      await expect(page).toHaveURL(SaucedemoURLS.BASE_URL);
    });
  });
});
