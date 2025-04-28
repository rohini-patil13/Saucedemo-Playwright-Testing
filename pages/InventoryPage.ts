import { expect, Locator, Page } from "@playwright/test";

interface ProductInfo {
    title: string;
    desc: string;
    price: string;
}

export class InventoryPage {
    private page: Page;
    private readonly inventoryPageSubtitle: Locator;
    private readonly productListingFilter: Locator;
    private readonly productBlock: Locator;
    private readonly cartBadge: Locator;
    private readonly productAddButton: Locator;


    constructor(page: Page) { 
        this.page = page;
        this.inventoryPageSubtitle = page.getByText("Products");
        this.productListingFilter = page.locator("//select[contains(@class,'product_sort')]");
        this.productBlock = page.locator("//div[@class='inventory_item']");
        this.cartBadge = page.locator('span.shopping_cart_badge');
        this.productAddButton = page.getByRole("button", { name: "Add to cart" });
    }

    getInventoryPageSubtitle(): Locator {
        return this.inventoryPageSubtitle;
    }

    getAllProductAddButtons() {
        return this.productAddButton;
    }
    
    async validateInventoryPage(): Promise<void> {
        await expect(this.inventoryPageSubtitle).toBeVisible();
    }

    getProductTitle(index: number): Locator {
        return this.productBlock.nth(index).locator(".inventory_item_name");
    }

    getProductDescription(index: number): Locator {
        return this.productBlock.nth(index).locator(".inventory_item_desc");
    }

    getProductPrice(index: number): Locator {
        return this.productBlock.nth(index).locator(".inventory_item_price");
    }

    async getProductInfo(index: number): Promise<{ title: string; desc: string; price: string; } | null> {
        const itemName = await this.getProductTitle(index).textContent() || '';
        const itemDesc = await this.getProductDescription(index).textContent() || '';
        const itemPrice = await this.getProductPrice(index).textContent() || '';

        return {'title': itemName, 'desc': itemDesc, 'price':itemPrice};
    }

    getAddToCartButton(index: number): Locator {
        return this.productBlock.nth(index).getByRole("button", { name: "Add to cart" });
    }

    getRemoveButton(index: number): Locator {
        return this.productBlock.nth(index).getByRole("button", { name: "Remove" });
    }

    getProductByName(name: string): Locator {
        return this.productBlock.filter({ hasText: name });
    }

    getAddToCartButtonByName(name: string): Locator {
        return this.getProductByName(name).getByRole("button", { name: "Add to cart" });
    }

    getRemoveButtonByName(name: string): Locator {
        return this.getProductByName(name).getByRole("button", { name: "Remove" });
    }

    getProductImage(index: number): Locator {
        return this.productBlock.nth(index).locator(".inventory_item_img");
    }

    async selectProductFilterOption(option: string): Promise<void> {
        await this.productListingFilter.selectOption(option);
    }

    async addItemToCart(index: number) {
        await expect(this.getAddToCartButton(index)).toBeEnabled();
        await this.getAddToCartButton(index).click();
        await expect(this.getRemoveButton(index),"Add to Cart action failed - Remove button not visible").toBeVisible();
    }

    async removeItemFromCart(index: number) {
        await this.getRemoveButton(index).click();
        await expect(this.getAddToCartButton(index)).toBeVisible();
    }

    async addMultipleItemsToCart(count: number, itemList: ProductInfo[]) {
        for (let i = 0; i < count; i++) {
            await this.addItemToCart(i);
            await expect(this.cartBadge).toHaveText(String(i + 1));
            const productInfo = await this.getProductInfo(i);
            if (productInfo) {
                itemList.push(productInfo);
            }
        }
    }

    async removeMultipleItemsFromCart(count: number, itemList: ProductInfo[]) {
        for (let i = 0; i < count; i++) {
            await this.removeItemFromCart(i);
            await expect(this.cartBadge).toHaveText(String(itemList.length - 1));
            itemList.shift();
        }
    }

    async validateItemsVisibleInCart(itemList: ProductInfo[]) {
        for (const item of itemList) {
            const removeButton = this.getRemoveButtonByName(item.title);
            await expect(removeButton).toBeVisible();
        }
    }

    async assertCartBadgeCount(expectedCount: number): Promise<void> {
        if (expectedCount === 0) {
            return;
        } else {
            await expect(this.cartBadge).toHaveText(expectedCount.toString());
        }
    }

    async assertProductDetails(index: number, expected: ProductInfo): Promise<void> {
        const actualTitle = await this.getProductTitle(index).textContent();
        const actualDesc = await this.getProductDescription(index).textContent();
        const actualPrice = await this.getProductPrice(index).textContent();

        expect(actualTitle?.trim()).toBe(expected.title);
        expect(actualDesc?.trim()).toContain(expected.desc.substring(0, 10)); // match start of description (partial match if needed)
        expect(actualPrice?.trim()).toBe(expected.price);
    }

    async assertSortingOrder(order: 'asc' | 'desc'): Promise<void> {
        const prices: number[] = [];

        const priceElements = this.page.locator('.inventory_item_price');
        const count = await priceElements.count();

        for (let i = 0; i < count; i++) {
            const priceText = await priceElements.nth(i).textContent();
            if (priceText) {
                prices.push(parseFloat(priceText.replace('$', '')));
            }
        }

        const sortedPrices = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a);
        expect(prices).toEqual(sortedPrices);
    }

    async assertNameSortingOrder(order: 'asc' | 'desc'): Promise<void> {
        const titles: string[] = [];
    
        const titleElements = this.page.locator('.inventory_item_name');
        const count = await titleElements.count();
    
        for (let i = 0; i < count; i++) {
            const titleText = await titleElements.nth(i).textContent();
            if (titleText) {
                titles.push(titleText.trim());
            }
        }
    
        const sortedTitles = [...titles].sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
        expect(titles).toEqual(sortedTitles);
    }

    getAllProductTitles(): Locator {
        return this.page.locator('.inventory_item_name');
    }
    
    getAllProductImages(): Locator {
        return this.page.locator('.inventory_item_img img');
    }
}