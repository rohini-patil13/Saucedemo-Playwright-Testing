import { expect, Locator, Page } from "@playwright/test";

export class CheckoutInfoPage {

    private page: Page;
    private readonly checkoutSubtitle: Locator;
    private readonly cancelButton: Locator;
    private readonly continueButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutSubtitle = page.getByText('Checkout: Your Information');
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.errorMessage = page.locator("//div[contains(@class,'error-message')]");
    }

    getCheckoutSubtitle(): Locator {
        return this.checkoutSubtitle;
    }

    async assertErrorMessage(expectedErrorMessage: string) {
        await expect(this.errorMessage.isVisible()).toBeTruthy();
        await expect(this.errorMessage).toHaveText(expectedErrorMessage);
    }


    async fillCheckoutInformation(longString: string, longString1: string, longString2: string) {
        await this.firstNameInput.fill(longString);
        await this.lastNameInput.fill(longString1);
        await this.zipCodeInput.fill(longString2);
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async enterZipCode(zipCode: string): Promise<void> {
        await this.zipCodeInput.fill(zipCode);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }
}
