import { expect, Locator, Page, test } from '@playwright/test';
import { URLs } from '../Data/0_DataIndex';

export class TransactionDetailsPage {

    //locators
    readonly transactionDetailsPageMessage: Locator;
    readonly transferredAmount: Locator;
    readonly transactionId: Locator;

    //constructor
    constructor(public page: Page) {
        this.transactionDetailsPageMessage = page.locator("//h1[normalize-space()='Transaction Details']");
        this.transferredAmount = page.locator('td:has-text("Amount") + td');
        this.transactionId = page.locator('td:has-text("Transaction ID") + td');
    }

    //methods
    async goToTransactionDetailsPage(transactionId: number) {
        await test.step(`Go to Transaction Details page`, async () => {
            await this.page.goto(URLs.TransactionDetailsPage + transactionId);
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async transactionDetailsPageIsOpened() {
        await test.step(`Assert that Transaction Details page is opened`, async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.TransactionDetailsPage + /\d+/));
            await expect(this.transactionDetailsPageMessage).toBeVisible();
        });
    }
    async verifyTransactionId(transactionId: number) {
        await test.step(`Verify the right transaction ID page is opened for ${transactionId}`, async () => {
            await expect(this.transactionId).toHaveText(transactionId.toString());
        });
    }
}