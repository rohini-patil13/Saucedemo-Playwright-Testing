import { Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    private page: Page;
    private readonly backToProductsButton: Locator;
    private readonly productImg: Locator;
    private readonly productTitle: Locator;
    private readonly productDesc: Locator;
    private readonly productPrice: Locator;
    private readonly addToCartButton: Locator;
    private readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backToProductsButton = page.getByText("Back to products");
        this.productTitle = page.locator("//div[contains(@class,'inventory_details_name')]");
        this.productDesc = page.locator("//div[contains(@data-test,'inventory-item-desc')]");
        this.productPrice = page.locator("//div[contains(@class,'inventory_details_price')]");
        this.addToCartButton = page.getByRole('button', {name: "Add to cart"});
        this.removeButton = page.getByRole('button', {name: "Remove"});
        this.productImg = page.locator("//div[contains(@class,'inventory_details_img')]//img");
    }

    async getProductTitleText(): Promise<string | null> {
        return await this.productTitle.textContent();
    }

    async getProductDescText(): Promise<string | null> {
        return await this.productDesc.textContent();
    }

    async getProductPriceText(): Promise<string | null> {
        return await this.productPrice.textContent();
    }

    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async clickBackToProducts(): Promise<void> {
        await this.backToProductsButton.click();
    }

    async clickRemove(): Promise<void> {
        await this.removeButton.click();
    }

    async isRemoveButtonVisible(): Promise<boolean> {
        return await this.removeButton.isVisible();
    }

    async isAddToCartButtonVisible(): Promise<boolean> {
        return await this.addToCartButton.isVisible();
    }

    async isProductImageVisible(): Promise<boolean> {
        return await this.productImg.isVisible();
    }
}