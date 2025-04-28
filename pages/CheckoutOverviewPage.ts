import { Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage {
    private page: Page;

    private readonly checkoutSubtitle: Locator;
    private readonly qtyLabel: Locator;
    private readonly descLabel: Locator;
    private readonly productBlock: Locator;
    private readonly cancelButton: Locator;
    private readonly finishButton: Locator;
    private readonly paymentInfoSubtitle: Locator;
    private readonly paymentCardInfo: Locator;
    private readonly shippingInfoSubtitle: Locator;
    private readonly shippingInfo: Locator;
    private readonly priceSubtitle: Locator;
    private readonly itemSubtotal: Locator;
    private readonly taxAmount: Locator;
    private readonly totalAmount: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkoutSubtitle = page.getByText("Checkout: Overview");
        this.qtyLabel = page.getByText("QTY");
        this.descLabel = page.getByText("Description");
        this.productBlock = page.locator("div.cart_item");

        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });

        this.paymentInfoSubtitle = page.getByText("Payment Information");
        this.paymentCardInfo = page.getByTestId('payment-info-value');

        this.shippingInfoSubtitle = page.getByText("Shipping Information:");
        this.shippingInfo = page.getByTestId('shipping-info-value');

        this.priceSubtitle = page.getByText("Price Total");
        this.itemSubtotal = page.getByTestId("subtotal-label");
        this.taxAmount = page.getByTestId("tax-label");
        this.totalAmount = page.getByTestId("total-label");
    }

    getcheckoutSubtitle(): Locator {
        return this.checkoutSubtitle;
    }

    getProductQuantity(index: number): Locator {
        return this.productBlock.nth(index).locator("div.cart_quantity");
    }

    getProductName(index: number): Locator {
        return this.productBlock.nth(index).locator("div.inventory_item_name");
    }

    getProductLink(index: number): Locator {
        return this.productBlock.nth(index).locator("a");
    }

    getProductDescription(index: number): Locator {
        return this.productBlock.nth(index).locator("div.inventory_item_desc");
    }

    getProductPrice(index: number): Locator {
        return this.productBlock.nth(index).locator("div.inventory_item_price");
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }

    async getPaymentCardInfo(): Promise<string | null> {
        return await this.paymentCardInfo.textContent();
    }

    async getShippingInfo(): Promise<string | null> {
        return await this.shippingInfo.textContent();
    }

    async getItemSubtotal(): Promise<string | null> {
        return await this.itemSubtotal.textContent();
    }

    async getTaxAmount(): Promise<string | null> {
        return await this.taxAmount.textContent();
    }

    async getTotalAmount(): Promise<string | null> {
        return await this.totalAmount.textContent();
    }

    async isCheckoutOverviewPageVisible(): Promise<boolean> {
        return await this.checkoutSubtitle.isVisible();
    }

    async getTotalProducts(): Promise<number> {
        return await this.productBlock.count();
    }
}
