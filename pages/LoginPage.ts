import { expect, Locator, Page } from "@playwright/test";
import { Assertion } from "../utils/Assertion";

export class LoginPage {
    private page: Page;
    private readonly usernameInputField: Locator;
    private readonly passwordInputField: Locator;
    private readonly loginButton : Locator;
    private readonly errorMessage: Locator;
    private readonly loginPageHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInputField = page.getByPlaceholder("Username");
        this.passwordInputField = page.getByPlaceholder("Password");
        this.loginButton  = page.getByRole('button', {name: "Login"});
        this.loginPageHeader = page.locator("div.login_logo");
        this.errorMessage = page.locator("//div[contains(@class,'error-message')]");
    }

    getLoginPageHeader(): Locator {
        return this.loginPageHeader;
    }

    getErrorMessage(): Locator {
        return this.errorMessage;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }
    
    async login(username: string, password: string): Promise<void> {
        await this.usernameInputField.fill(username);
        await this.passwordInputField.fill(password);
        await this.loginButton.click();
    }

    async validateLoginErrorMessage(expectedError: string): Promise<void> {
        Assertion.assertErrorMessage(this.page, expectedError, this.getErrorMessage())
    }

    async validateLoginPage() {
        await expect(this.loginPageHeader).toBeVisible();
        await expect(this.loginPageHeader).toHaveText("Swag Labs");
    }
}   