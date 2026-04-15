import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../../Data/0_DataIndex';
import * as fs from 'fs';
import * as path from 'path';

export class AccountDetailsPage {

    static currentTransactionId: string = '';
    private transDataPath = path.join(process.cwd(), 'testData_TransactionID.json');

    //locators
    readonly accountDetailsPageMessage: Locator;
    readonly accountNum: Locator;
    readonly accountActivityButton: Locator;
    readonly transactionTable: Locator;
    readonly fundsTransferSentCTA: Locator;

    //constructor
    constructor(public page: Page) {
        this.accountDetailsPageMessage = page.locator("div[id='accountDetails'] h1[class='title']");
        this.accountNum = page.locator("td#accountId");
        this.accountActivityButton = page.locator("//input[@value='Go']");
        this.transactionTable = page.locator("#transactionTable");
        this.fundsTransferSentCTA = page.locator('#transactionTable tbody tr td a').first();
    }

    //methods
    async goToAccountDetailsPage(accountId: string) {
        await this.page.goto(URLs.AccountDetailsPage + "?id=" + accountId);
        await this.page.waitForLoadState('networkidle');
    }

    async openFundsTransferSentPage() {
        await this.accountActivityButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async captureCurrentTransactionId() {
        const href = await this.fundsTransferSentCTA.getAttribute('href');
        let capturedId = '';
        if (href) {
            const match = href.match(/id=(\d+)/);
            capturedId = match ? match[1] : '';
        }
        const data = { currentTransactionId: capturedId };
        fs.writeFileSync(this.transDataPath, JSON.stringify(data, null, 2));
        console.log(`Debug: Captured and Saved ID -> ${capturedId}`);
    }

    async useCurrentTransactionId() {
        let savedData;
        if (fs.existsSync(this.transDataPath)) {
            savedData = JSON.parse(fs.readFileSync(this.transDataPath, 'utf-8'));
        }
        if (!savedData || !savedData.currentTransactionId) {
            console.error("Transaction ID is undefined or file missing");
            return '';
        }
        console.log(`Using Transaction ID from file: ${savedData.currentTransactionId}`);
        return savedData.currentTransactionId;
    }

    async clickOnFundsTransferSentCTA() {
        await this.fundsTransferSentCTA.click();
        await this.page.waitForLoadState('networkidle');
    }

    //assertions
    async verifyAccountDetailsPageIsOpened() {
        await expect(this.page).toHaveURL(new RegExp(URLs.AccountDetailsPage + '.*'));
        await expect(this.accountDetailsPageMessage).toBeVisible();
        await expect(this.accountNum).toBeVisible();
        await expect(this.transactionTable).toBeVisible();
    }

    async verifyAccountDetailsPageIsNotOpened() {
        await expect(this.accountDetailsPageMessage).not.toBeVisible();
        await expect(this.accountNum).not.toBeVisible();
        await expect(this.transactionTable).not.toBeVisible();
    }
    async verifyAccountNumber(expectedAccountNum: string) {
        await expect(this.accountNum).toHaveText(expectedAccountNum);
    }
    async verifyTransactionExists(transactionText: string) {
        const transaction = this.page.getByText(transactionText);
        await expect(transaction).toBeVisible();
    }

    async verifyFundsTransferSentCTAisVisible() {
        await expect(this.fundsTransferSentCTA).toBeVisible();
    }
}