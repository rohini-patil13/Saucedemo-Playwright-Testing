import { expect, Locator, Page } from '@playwright/test';

export class Assertion {
    static async assertPage(page: Page, expectedUrl: string, elementSelector: Locator): Promise<void> {
        await expect(page).toHaveURL(expectedUrl);
        await expect(elementSelector).toBeVisible();
    }

    static async assertErrorMessage(page: Page, expectedMessage: string, errorLocator: Locator) {
        const errorMessage = await errorLocator.innerText(); 
        expect(errorLocator).toBeVisible();
        expect(errorMessage).toContain(expectedMessage);
    }  
}
