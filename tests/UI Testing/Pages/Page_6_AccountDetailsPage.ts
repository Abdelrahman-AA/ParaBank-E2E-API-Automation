import { expect, Locator, Page, test } from '@playwright/test';
import { URLs } from '../Data/0_DataIndex';

export class AccountDetailsPage {

    //locators
    readonly accountDetailsPageMessage: Locator;
    readonly accountNum: Locator;
    readonly goAccountActivityButton: Locator;
    readonly transactionTable: Locator;
    readonly fundsTransferSentCTA: Locator;

    //constructor
    constructor(public page: Page) {
        this.accountDetailsPageMessage = page.locator("//h1[normalize-space()='Account Details']");
        this.accountNum = page.locator("td#accountId");
        this.goAccountActivityButton = page.locator("//input[@value='Go']");
        this.transactionTable = page.locator("#transactionTable");
        // this.fundsTransferSentCTA = page.locator("text=Funds Transfer Sent");
        // this.fundsTransferSentCTA = page.locator("#transactionTable a", { hasText: 'Funds Transfer Sent' }).first();
        this.fundsTransferSentCTA = page.locator('#transactionTable tbody tr td a').first();
    }

    //methods
    async goToAccountDetailsPage(accountId: number) {
        await test.step(`Go to Account Details page`, async () => {
            await this.page.goto(URLs.AccountDetailsPage + accountId);
            await this.page.waitForLoadState('networkidle');
        });
    }

    async openFundsTransferSentPage() {
        await test.step(`Open Funds Transfer Sent page`, async () => {
            await this.goAccountActivityButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async verifyAccountDetailsPageIsOpened() {
        await test.step(`Assert that Account Details page is opened`, async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.AccountDetailsPage + '.*'));
            await expect(this.accountDetailsPageMessage).toBeVisible();
            await expect(this.accountNum).toBeVisible();
            await expect(this.transactionTable).toBeVisible();
        });
    }
    async verifyAccountNumber(expectedAccountNum: string) {
        await test.step(`Verify account number is ${expectedAccountNum}`, async () => {
            await expect(this.accountNum).toHaveText(expectedAccountNum);
        });
    }
    async verifyTransactionExists(transactionText: string) {
        await test.step(`Verify transaction "${transactionText}" exists in history`, async () => {
            const transaction = this.page.getByText(transactionText);
            await expect(transaction).toBeVisible();
        });
    }
}