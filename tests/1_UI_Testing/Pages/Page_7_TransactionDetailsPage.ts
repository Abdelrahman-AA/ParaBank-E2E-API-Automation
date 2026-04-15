import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../../Data/0_DataIndex';

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
    async goToTransactionDetailsPage(transactionId: string) {
        await this.page.goto(URLs.TransactionDetailsPage + "?id=" + transactionId);
        await this.page.waitForLoadState('networkidle');
    }

    //assertions
    async verifyTransactionDetailsPageIsOpened() {
        await expect(this.page).toHaveURL(new RegExp(URLs.TransactionDetailsPage + '.*'));
        await expect(this.transactionDetailsPageMessage).toBeVisible();
    }

    async verifyTransactionDetailsPageIsNotOpened() {
        await expect(this.transactionDetailsPageMessage).not.toBeVisible();
    }

    async verifyTransactionId(transactionId: string) {
        await expect(this.transactionId).toHaveText(transactionId);
    }
}