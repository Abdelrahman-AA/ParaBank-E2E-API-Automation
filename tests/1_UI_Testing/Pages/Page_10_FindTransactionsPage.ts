import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../../Data/0_DataIndex';

export class FindTransactionsPage {

    //locators
    readonly findTransactionsMessage: Locator;
    readonly accountIdSelector: Locator;
    readonly transactionId: Locator;
    readonly findTransactionByIdButton: Locator;
    readonly transactionDate: Locator;
    readonly findTransactionByDateButton: Locator;
    readonly fromDate: Locator;
    readonly toDate: Locator;
    readonly findTransactionByDateRangeButton: Locator;
    readonly transactionAmount: Locator;
    readonly findTransactionByAmountButton: Locator;
    readonly foundTransactionSent: Locator;
    readonly fundsTransferReceived: Locator;
    readonly transactionDetails: Locator;

    //constructor
    constructor(public page: Page) {
        this.findTransactionsMessage = page.locator("//h1[normalize-space()='Find Transactions']");
        this.accountIdSelector = page.locator("#accountId");
        this.transactionId = page.locator("#transactionId");
        this.findTransactionByIdButton = page.locator("#findById");
        this.transactionDate = page.locator("#transactionDate");
        this.findTransactionByDateButton = page.locator("#findByDate");
        this.fromDate = page.locator("#fromDate");
        this.toDate = page.locator("#toDate");
        this.findTransactionByDateRangeButton = page.locator("#findByDateRange");
        this.transactionAmount = page.locator("#amount");
        this.findTransactionByAmountButton = page.locator("#findByAmount");
        this.foundTransactionSent = page.locator('tr').filter({ hasText: 'Funds Transfer Sent' }).locator('a').first();
        this.fundsTransferReceived = page.locator('tr').filter({ hasText: 'Funds Transfer Received' }).locator('a').first();
        this.transactionDetails = page.locator("//h1[normalize-space()='Transaction Details']");
    }

    //methods
    async goToFindTransactionsPage() {
        await this.page.goto(URLs.FindTransactionsPage);
        await this.page.waitForLoadState('networkidle');
    }
    async findTransactionById(transactionId: string, accountIdIndex: number = 0) {
        await this.accountIdSelector.selectOption({ index: accountIdIndex });
        await this.transactionId.fill(transactionId);
        await this.findTransactionByIdButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async findTransactionByDate(date: string, accountIdIndex: number = 0) {
        await this.accountIdSelector.selectOption({ index: accountIdIndex });
        await this.transactionDate.fill(date);
        await this.findTransactionByDateButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    async findTransactionByDateRange(from: string, to: string, accountIdIndex: number = 0,) {
        await this.accountIdSelector.selectOption({ index: accountIdIndex });
        await this.fromDate.fill(from);
        await this.toDate.fill(to);
        await this.findTransactionByDateRangeButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    async findTransactionByAmount(amount: string, accountIdIndex: number = 0,) {
        await this.accountIdSelector.selectOption({ index: accountIdIndex });
        await this.transactionAmount.fill(amount);
        await this.findTransactionByAmountButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    //assertions
    async verifyFindTransactionsPageIsOpened() {
        await expect(this.page).toHaveURL(new RegExp(URLs.FindTransactionsPage));
        await expect(this.findTransactionsMessage).toBeVisible();
        await expect(this.accountIdSelector).toBeVisible();
    }

    async verifyFindTransactionsPageIsNotOpened() {
        await expect(this.findTransactionsMessage).not.toBeVisible();
        await expect(this.accountIdSelector).not.toBeVisible();
    }
    async verifyFoundTransactionIsSent() {
        await expect(this.foundTransactionSent).toBeVisible();
    }
    async verifyFoundTransactionIsReceived() {
        await expect(this.fundsTransferReceived).toBeVisible();
    }
}