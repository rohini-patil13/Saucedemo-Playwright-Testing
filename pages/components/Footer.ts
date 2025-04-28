import { Locator, Page } from "@playwright/test";

export class Footer {
    private page: Page;
    private readonly copyrightText: Locator;
    private readonly twitterLink: Locator;
    private readonly facebookLink: Locator;
    private readonly linkedinLink: Locator;
    private readonly footerSec: Locator;

    constructor(page: Page) {
        this.page = page;
        this.copyrightText = page.locator("div.footer_copy");
        this.twitterLink = page.getByTestId("social-twitter");
        this.facebookLink = page.getByTestId("social-facebook");
        this.linkedinLink = page.getByTestId("social-linkedin");
        this.footerSec = page.locator("footer.footer");
    }

    getFooter(): Locator {
        return this.footerSec;
    }

    async getCopyrightText(): Promise<string | null> {
        return await this.copyrightText.textContent();
    }

    async clickSocialLink(platform: 'twitter' | 'facebook' | 'linkedin'): Promise<void> {
        const link = this.page.getByTestId(`social-${platform}`);
        await link.click();
    }

    async isTwitterLinkVisible(): Promise<boolean> {
        return await this.twitterLink.isVisible();
    }

    async isFacebookLinkVisible(): Promise<boolean> {
        return await this.facebookLink.isVisible();
    }

    async isLinkedInLinkVisible(): Promise<boolean> {
        return await this.linkedinLink.isVisible();
    }
}
