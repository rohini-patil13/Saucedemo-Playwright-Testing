import { Locator, Page } from "@playwright/test";

export class CheckoutConfirmationPage {
    private page: Page;
    private readonly checkoutSubtitle: Locator;
    private readonly confirmTickImage: Locator;
    private readonly confirmHeader: Locator;
    private readonly confirmText: Locator;
    private readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutSubtitle = page.getByText("Checkout: Complete!");
        this.confirmTickImage = page.getByAltText("Pony Express");
        this.confirmHeader = page.locator('[data-test="complete-header"]');
        this.confirmText = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    }

    getCheckoutSubtitle(): Locator {
        return this.checkoutSubtitle;
    }

    async isCheckoutCompletePageLoaded(): Promise<boolean> {
        return await this.checkoutSubtitle.isVisible();
    }

    getConfirmationHeader(): Locator {
        return this.confirmHeader;
    }

    async getConfirmationText(): Promise<string | null> {
        return await this.confirmText.textContent();
    }

    async clickBackHome(): Promise<void> {
        await this.backHomeButton.click();
    }

    async isConfirmationTickVisible(): Promise<boolean> {
        return await this.confirmTickImage.isVisible();
    }
    
}
