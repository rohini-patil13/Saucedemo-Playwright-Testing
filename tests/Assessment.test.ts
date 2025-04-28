import { expect, test, Page } from "@playwright/test";
import { BaseTest } from "../utils/BaseTest";
import { EnvReader as env } from "../utils/EnvReader";
import { Assertion } from "../utils/Assertion"; 
import { SaucedemoURLS } from "../utils/Constants";

type ProductInfo = { title: string, desc: string, price: string };
const baseURL = env.baseUrl;
const usernames = [
    env.standardUser,
    env.problemUser,
    env.performanceGlitchUser,
    env.errorUser,
    env.visualUser
  ];

test.describe("Automation Assessment - Saucedemo E-Commerce Website", { tag: '@Assessment' }, () => {
    let app: BaseTest;

    test.beforeEach(async ({ page }) => {
        app = new BaseTest(page);
        await app.loginPage.navigate(baseURL);
    });

    usernames.forEach((username) => {
    test(`Verify Add/Remove Items to Cart and Cart Display Functionality for user: ${username}`, async ({page}) => {

        const TOTAL_ITEMS = 5;
        const ITEMS_TO_REMOVE = 3;
        const itemList: ProductInfo[] = [];

        await test.step(`Login with username: ${username}`, async () => {
            await app.loginPage.login(username, env.password);
        });

        await test.step("Validate inventory page loaded", async () => {
            const inventoryPageTitle = app.inventoryPage.getInventoryPageSubtitle();
            await Assertion.assertPage(page, SaucedemoURLS.INVENTORY, inventoryPageTitle);
        });

        await test.step("Add items to cart and collect product info", async () => {
            await app.inventoryPage.addMultipleItemsToCart(TOTAL_ITEMS, itemList);
        });

        await test.step("Remove selected items from cart", async () => {
            await app.inventoryPage.removeMultipleItemsFromCart(ITEMS_TO_REMOVE, itemList);
        });

        await test.step("Validate items in cart page", async () => {
            await app.header.clickCartButton();
            await app.cartPage.validateCartPageLoaded();

            itemList.forEach(async (item, index) => {
                await app.cartPage.validateCartItem(index, item);
            });           
        });

        await test.step("Continue shopping and validate inventory page", async () => {
            await app.cartPage.clickContinueShopping();
            await app.inventoryPage.validateInventoryPage();
            await app.inventoryPage.validateItemsVisibleInCart(itemList);
        });

        await test.step("Navigate back to cart and proceed to checkout", async () => {
            await app.header.clickCartButton();
            await app.cartPage.validateCartPageLoaded();
            await app.cartPage.clickCheckout();
        });
    });
});

    test.afterEach(async () => {
        await app.header.clickMenuButton();
        await app.header.clickMenuItemResetAppState();
        await app.header.clickMenuItemLogout();
        await app.loginPage.validateLoginPage();
    });
});
