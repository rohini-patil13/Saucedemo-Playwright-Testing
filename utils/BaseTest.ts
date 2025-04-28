import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutConfirmationPage } from '../pages/CheckoutConfirmationPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { Header } from "../pages/components/Header";
import { Footer } from '../pages/components/Footer';
import { Assertion } from './Assertion';

export class BaseTest {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutInfoPage: CheckoutInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutConfirmationPage: CheckoutConfirmationPage;
    productDetailsPage: ProductDetailsPage;
    header: Header;
    footer: Footer;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutInfoPage = new CheckoutInfoPage(page);
        this.checkoutOverviewPage = new CheckoutOverviewPage(page);
        this.checkoutConfirmationPage = new CheckoutConfirmationPage(page);
        this.productDetailsPage = new ProductDetailsPage(page);
        this.header = new Header(page);
        this.footer = new Footer(page);
    }
}
