import { Locator, Page, expect } from "@playwright/test";

interface ProductInfo {
    title: string;
    desc: string;
    price: string;
}

export class CartPage {
    private page: Page;
    private readonly yourCartSubtitle: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly checkoutButton: Locator;
    private readonly productBlock: Locator;

    constructor(page: Page) {
        this.page = page;
        this.yourCartSubtitle = page.getByText("Your Cart");
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.productBlock = page.locator("div.cart_item");
    }

    getCartSubtitle(): Locator {
        return this.yourCartSubtitle;
    }

    getProductQuantity(index: number): Locator {
        return this.productBlock.nth(index).locator("div.cart_quantity");
    }

    getProductName(index: number): Locator {
        return this.productBlock.nth(index).locator("div.inventory_item_name");
    }

    getProductDescription(index: number): Locator {
        return this.productBlock.nth(index).locator("div.inventory_item_desc");
    }

    getProductPrice(index: number): Locator {
        return this.productBlock.nth(index).locator("div.inventory_item_price");
    }

    getRemoveButton(index: number): Locator {
        return this.productBlock.nth(index).getByRole('button', { name: 'Remove' });
    }

    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async getProductQuantityText(index: number): Promise<string | null> {
        const quantityLocator = this.getProductQuantity(index);
        await expect(quantityLocator).toBeVisible();
        return await quantityLocator.innerText();
    }

    async getProductNameText(index: number): Promise<string | null> {
        return await this.getProductName(index).textContent();
    }

    async getProductDescriptionText(index: number): Promise<string | null> {
        return await this.getProductDescription(index).textContent();
    }

    async getProductPriceText(index: number): Promise<string | null> {
        await expect(this.getProductPrice(index)).toBeVisible();
        return await this.getProductPrice(index).textContent();
    }

    async validateCartPageLoaded(): Promise<void> {
        await expect(this.yourCartSubtitle).toBeVisible();
    }

    async validateCartItem(index: number, expected: ProductInfo) {
        await expect(await this.getProductNameText(index),"Product name not matching").toBe(expected.title);
        await expect(await this.getProductDescriptionText(index),"Product description not matching").toBe(expected.desc);
        await expect(await this.getProductPriceText(index),"Product price not matching").toBe(expected.price);
        await expect(await this.getProductQuantityText(index),"Product quantity not matching").toBe("1");
    }
    
}
