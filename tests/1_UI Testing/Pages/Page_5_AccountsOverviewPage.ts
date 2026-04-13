import { expect, Locator, Page, test } from '@playwright/test';
import { URLs } from '../Data/0_DataIndex';
import * as fs from 'fs';
import * as path from 'path';

export class AccountsOverviewPage {

    static mainAccountNumber: string;
    private dataPath = path.join(process.cwd(), 'testData_AccountID.json');

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
            await this.page.goto(URLs.AccountsOverviewPage);
            await this.page.waitForLoadState('networkidle');
        });
    }
    async captureMainAccountNumber() {
        await test.step(`Capture and Save Main Account Number`, async () => {
            const accountText = await this.firstAccountLink.textContent();
            const accountNumber = accountText ? accountText.trim() : '';
            const data = { id: accountNumber };
            fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
            console.log(`Saved Account Number: ${accountNumber}`);
        });
    }

    async useMainAccountNumber() {
        let savedData;
        if (fs.existsSync(this.dataPath)) {
            savedData = JSON.parse(fs.readFileSync(this.dataPath, 'utf-8'));
        }
        if (!savedData || !savedData.id) {
            console.error("Account ID is undefined or file missing");
            return '';
        }
        console.log(`Using Account Number: ${savedData.id}`);
        return savedData.id;
    }

    async clickOnFirstAccount() {
        await test.step(`Click on First Account Link`, async () => {
            await this.firstAccountLink.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    // Assertions
    async verifyAccountsOverviewPageIsOpened() {
        await test.step(`Assert that Accounts Overview page is opened`, async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.AccountsOverviewPage));
            await expect(this.accountsOverviewPageMessage).toBeVisible();
            await expect(this.accountTable).toBeVisible();
            await expect(this.firstAccountLink).toBeVisible();
        });
    }

        async verifyAccountsOverviewPageIsNotOpened() {
        await test.step(`Assert that Accounts Overview page is Not opened`, async () => {
            await expect(this.accountsOverviewPageMessage).not.toBeVisible();
            await expect(this.accountTable).not.toBeVisible();
            await expect(this.firstAccountLink).not.toBeVisible();
        });
    }

    async verifyAccountTableIsVisible() {
        await test.step(`Assert that Account Table is visible`, async () => {
            await expect(this.accountTable).toBeVisible();
        });
    }
}