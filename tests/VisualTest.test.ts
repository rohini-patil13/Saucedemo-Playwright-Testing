import { test, expect, Page } from '@playwright/test';
import { BaseTest } from "../utils/BaseTest"
import { SaucedemoURLS } from '../utils/Constants';
import { EnvReader as env } from '../utils/EnvReader';
import checkoutInfo from '../testData/checkoutData.json';

let app: BaseTest;
let page: Page;

test.describe.serial('Visual Regression Testing for Saucedemo Website (Serial Execution)', { tag: '@Visual' }, () => {

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        app = new BaseTest(page);

        await app.loginPage.navigate(SaucedemoURLS.BASE_URL);
        await app.loginPage.login(env.standardUser, env.password);
    });

    test('Visual Test: Login Page', async () => {
        await test.step('Verify login page visual appearance', async () => {
            await expect(await page.screenshot()).toMatchSnapshot('login-page.png', {threshold: 0.1 });
        });
    });

    test('Visual Test: Inventory Page', async () => {
        await test.step('Verify inventory page visual appearance', async () => {
            await expect(await page.screenshot()).toMatchSnapshot('inventory-page.png', {threshold: 0.1 });
        });
    });

    test('Visual Test: Header', async () => {
        await test.step('Verify header visual appearance', async () => {
            await expect(await app.header.getHeader().screenshot()).toMatchSnapshot('header.png', {threshold: 0.1 });
        });
    });

    test('Visual Test: Product Page', async () => {
        await app.inventoryPage.addItemToCart(0);
        await app.inventoryPage.getProductTitle(0).click();

        await test.step('Verify product page visual appearance', async () => {
            await expect(await page.screenshot()).toMatchSnapshot('product-page.png', {threshold: 0.1 });
        });
    });

    test('Visual Test: Cart Page', async () => {
        await app.inventoryPage.addItemToCart(0);
        await app.header.clickCartButton();

        await test.step('Verify cart page visual appearance', async () => {
            await expect(await page.screenshot()).toMatchSnapshot('cart-page.png', {threshold: 0.1 });
        });
    });

    test('Visual Test: Checkout Information Page', async () => {
        await app.cartPage.clickCheckout();
        await app.checkoutInfoPage.fillCheckoutInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
        await app.checkoutInfoPage.clickContinue();

        await test.step('Verify checkout page 1 visual appearance', async () => {
            await expect(await page.screenshot()).toMatchSnapshot('checkout-info-page.png', {threshold: 0.1 });
        });
    });

    test('Visual Test: Checkout Confirmation Page', async () => {
        await app.checkoutOverviewPage.clickFinish();

        await test.step('Verify checkout confirmation page visual appearance', async () => {
            await expect(await page.screenshot()).toMatchSnapshot('checkout-confirmation-page.png', {threshold: 0.1 });
        });
    });

    test.afterAll(async () => {
        await page.context().close();
    });

});
