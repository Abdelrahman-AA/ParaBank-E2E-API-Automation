import { expect, Locator, Page, test } from '@playwright/test';
import { URLs } from '../Data/0_DataIndex';

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
        this.foundTransactionSent = page.locator('a').filter({ hasText: 'Funds Transfer Sent' });
        this.fundsTransferReceived = page.locator('a').filter({ hasText: 'Funds Transfer Received' });
        this.transactionDetails = page.locator("//h1[normalize-space()='Transaction Details']");
    }

    //methods
    async goToFindTransactionsPage() {
        await test.step('Go to Find Transactions Page', async () => {
            await this.page.goto(URLs.FindTransactionsPage);
            await this.page.waitForLoadState('networkidle');
        });
    }
    async findTransactionById(accountIdIndex: number = 0, transactionId: string) {
        await test.step(`Find transaction by ID: ${transactionId}`, async () => {
            await this.accountIdSelector.selectOption({ index: accountIdIndex });
            await this.transactionId.fill(transactionId);
            await this.findTransactionByIdButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async findTransactionByDate(accountIdIndex: number = 0, date: string) {
        await test.step(`Find transaction by date: ${date}`, async () => {
            await this.accountIdSelector.selectOption({ index: accountIdIndex });
            await this.transactionDate.fill(date);
            await this.findTransactionByDateButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }
    async findTransactionByDateRange(accountIdIndex: number = 0, from: string, to: string) {
        await test.step(`Find transaction by date range: from ${from} to ${to}`, async () => {
            await this.accountIdSelector.selectOption({ index: accountIdIndex });
            await this.fromDate.fill(from);
            await this.toDate.fill(to);
            await this.findTransactionByDateRangeButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }
    async findTransactionByAmount(accountIdIndex: number = 0, amount: string) {
        await test.step(`Find transaction by amount: ${amount}`, async () => {
            await this.accountIdSelector.selectOption({ index: accountIdIndex });
            await this.transactionAmount.fill(amount);
            await this.findTransactionByAmountButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async findTransactionsPageIsOpened() {
        await test.step('Assert that Find Transactions page is opened', async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.FindTransactionsPage));
            await expect(this.findTransactionsMessage).toBeVisible();
            await expect(this.accountIdSelector).toBeVisible();
        });
    }
    async verifyFoundTransactionIsSent() {
        await test.step('Verify that found transaction is "Funds Transfer Sent"', async () => {
            await expect(this.foundTransactionSent).toBeVisible();
        });
    }
    async verifyFoundTransactionIsReceived() {
        await test.step('Verify that found transaction is "Funds Transfer Received"', async () => {
            await expect(this.fundsTransferReceived).toBeVisible();
        });
    }
}