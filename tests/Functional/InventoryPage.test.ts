import { test, expect, Page } from '@playwright/test';
import { BaseTest } from '../../utils/BaseTest';
import { Assertion } from '../../utils/Assertion';
import { SaucedemoURLS } from '../../utils/Constants';
import { EnvReader as env } from '../../utils/EnvReader';
import products from '../../testData/products.json';

let app: BaseTest;
type ProductInfo = { title: string, desc: string, price: string };

test.describe('Inventory Page', () => {

    test.beforeEach(async ({ page }) => {
        app = new BaseTest(page);
        await test.step('Navigate to the login page and login', async () => {
            await app.loginPage.navigate(env.baseUrl);
            await app.loginPage.login(env.standardUser, env.password);  
            const inventoryPageTitle = app.inventoryPage.getInventoryPageSubtitle();
            await Assertion.assertPage(page, SaucedemoURLS.INVENTORY, inventoryPageTitle);
        });
    });

    test('Verify adding a single product to cart updates cart badge for standard user', async ({ page }) => {
        await test.step('Add product to cart', async () => {
            await app.inventoryPage.addItemToCart(0);
        });

        await test.step('Verify cart badge updates to 1', async () => {
            await app.inventoryPage.assertCartBadgeCount(1);
        });
    });

    test('Verify removing a product from cart updates cart badge for standard user', async ({ page }) => {
        await test.step('Add and then remove product from cart', async () => {
            await app.inventoryPage.addItemToCart(0);
            await app.inventoryPage.assertCartBadgeCount(1);
            await app.inventoryPage.removeItemFromCart(0);
        });

        await test.step('Verify cart badge updates back to 0', async () => {
            await app.inventoryPage.assertCartBadgeCount(0);
        });
    });

    test('Verify adding multiple products to cart for standard user', async ({ page }) => {
        const itemList: ProductInfo[] = [];

        await test.step('Add multiple products to cart', async () => {
            await app.inventoryPage.addMultipleItemsToCart(3, itemList);
        });

        await test.step('Verify cart badge updates correctly', async () => {
            await app.inventoryPage.assertCartBadgeCount(3);
        });
    });

    test('Verify removing multiple products from cart for standard user', async ({ page }) => {
        const itemList: ProductInfo[] = [];

        await test.step('Add and remove multiple products', async () => {
            await app.inventoryPage.addMultipleItemsToCart(3, itemList);
            await app.inventoryPage.removeMultipleItemsFromCart(2, itemList);
        });

        await test.step('Verify cart badge reflects remaining item', async () => {
            await app.inventoryPage.assertCartBadgeCount(1);
        });
    });

    test('Verify product details are displayed correctly for standard user', async ({ page }) => {
        const expectedProductInfo = products[2];

        await test.step('Validate product information', async () => {
            await app.inventoryPage.assertProductDetails(0, expectedProductInfo);
        });
    });

    test('Verify sorting by Price (low to high) for standard user', async ({ page }) => {
        await test.step('Select Price (low to high) filter', async () => {
            await app.inventoryPage.selectProductFilterOption('lohi');
        });

        await test.step('Verify sorting order', async () => {
            await app.inventoryPage.assertSortingOrder('asc');
        });
    });

    test('Verify sorting by Price (high to low) for standard user', async ({ page }) => {
        await test.step('Select Price (high to low) filter', async () => {
            await app.inventoryPage.selectProductFilterOption('hilo');
        });

        await test.step('Verify sorting order', async () => {
            await app.inventoryPage.assertSortingOrder('desc');
        });
    });

    test('Verify sorting by Name (A to Z) for standard user', async () => {
        await test.step('Select Name (A to Z) filter', async () => {
            await app.inventoryPage.selectProductFilterOption('az');
        });

        await test.step('Verify sorting order by Name ascending', async () => {
            await app.inventoryPage.assertNameSortingOrder('asc');
        });
    });

    test('Verify sorting by Name (Z to A) for standard user', async () => {
        await test.step('Select Name (Z to A) filter', async () => {
            await app.inventoryPage.selectProductFilterOption('za');
        });

        await test.step('Verify sorting order by Name descending', async () => {
            await app.inventoryPage.assertNameSortingOrder('desc');
        });
    });

    test('Verify special character handling in product names for standard user', async () => {
        await test.step('Validate product names with special characters do not break layout', async () => {
            const allProducts = app.inventoryPage.getAllProductTitles();
            const count = await allProducts.count();
            for (let i = 0; i < count; i++) {
                const productName = await allProducts.nth(i).textContent();
                expect(productName).not.toBeNull();
                expect(productName,"Product name contains invalid characters").toMatch(/^[A-Za-z0-9\s\-\@\&\(\)]+$/); 
            }
        });
    });
});
