import { Locator, Page, expect } from "@playwright/test";

export class Header {
    private page: Page;
    private readonly cartButton: Locator;
    private readonly pageHeaderTitle: Locator;
    private readonly menuButton: Locator;
    private readonly menuItemAllItemsOption: Locator;
    private readonly menuItemAboutOption: Locator;
    private readonly menuItemLogoutOption: Locator;
    private readonly menuItemResetAppStateOption: Locator;
    private readonly closeMenuButton: Locator;
    private readonly cartBadge: Locator;
    private readonly headerSec: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartButton = page.locator("div.shopping_cart_container");
        this.cartBadge = page.locator("span.shopping_cart_badge");
        this.pageHeaderTitle = page.getByText("Swag Labs");
        this.menuButton = page.locator("div.bm-burger-button");
        this.menuItemAllItemsOption = page.locator("#inventory_sidebar_link");
        this.menuItemAboutOption = page.locator("#about_sidebar_link");
        this.menuItemLogoutOption = page.locator("#logout_sidebar_link");
        this.menuItemResetAppStateOption = page.locator("#reset_sidebar_link");
        this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
        this.headerSec = page.locator("div.primary_header");
    }

    getHeader(): Locator {
        return this.headerSec;
    }

    async clickCartButton(): Promise<void> {
        await this.cartButton.click();
    }

    async clickMenuButton(): Promise<void> {
        await this.menuButton.click();
    }

    async clickMenuItemAllItems(): Promise<void> {
        await this.menuItemAllItemsOption.click();
    }

    async clickMenuItemAbout(): Promise<void> {
        await this.menuItemAboutOption.click();
    }

    async clickMenuItemLogout(): Promise<void> {
        await this.menuItemLogoutOption.click();
    }

    async clickMenuItemResetAppState(): Promise<void> {
        await this.menuItemResetAppStateOption.click();
    }
}
