import { expect, Locator, Page, test } from '@playwright/test';
import { URLs } from '../Data/0_DataIndex';

export class AccountsOverviewPage {

    // Locators
    readonly accountsOverviewPageMessage: Locator;
    readonly accountTable: Locator;
    readonly firstAccountLink: Locator;

    // Constructor
    constructor(public page: Page) {
        this.accountsOverviewPageMessage = page.locator("//h1[normalize-space()='Accounts Overview']");
        this.accountTable = page.locator('#accountTable');
        this.firstAccountLink = page.locator('#accountTable tbody tr').first().locator('td a');
    }

    // Methods
    async goToAccountsOverviewPage() {
        await test.step(`Go to Accounts Overview page`, async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.AccountsOverviewPage));
            await this.page.goto(URLs.AccountsOverviewPage);
            await this.page.waitForLoadState('networkidle');
        });
    }

    // Assertions
    async verifyAccountsOverviewPageIsOpened() {
        await test.step(`Assert that Accounts Overview page is opened`, async () => {
            await expect(this.accountsOverviewPageMessage).toBeVisible();
            await expect(this.accountTable).toBeVisible();
            await expect(this.firstAccountLink).toBeVisible();
        });
    }
}