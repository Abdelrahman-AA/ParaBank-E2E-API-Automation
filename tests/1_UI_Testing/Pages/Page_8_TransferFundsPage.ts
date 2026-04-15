import { expect, Locator, Page } from '@playwright/test';
import { URLs } from '../../Data/0_DataIndex';

export class TransferFundsPage {

    //locators
    readonly transferFundsPageMessage: Locator;
    readonly amount: Locator;
    readonly fromAccountNum: Locator;
    readonly toAccountNum: Locator;
    readonly transferButton: Locator;
    readonly transferDone: Locator;
    readonly successfullyTransferMessage: Locator;

    //constructor
    constructor(public page: Page) {
        this.transferFundsPageMessage = page.locator("//h1[normalize-space()='Transfer Funds']");
        this.amount = page.locator("#amount");
        this.fromAccountNum = page.locator("#fromAccountId");
        this.toAccountNum = page.locator("#toAccountId");
        this.transferButton = page.locator("//input[@value='Transfer']");
        this.transferDone = page.locator("//h1[normalize-space()='Transfer Complete!']");
        this.successfullyTransferMessage = page.locator("//div[@id='showResult']//p[1]");
    }

    //methods
    async goToTransferFundsPage() {
        await this.page.goto(URLs.TransferFundsPage);
        await this.page.waitForLoadState('networkidle');
    }

    async makeTransfer(amount: string, fromAccountNumIndex: number, toAccountNumIndex: number) {
        await this.amount.fill(amount);
        await this.fromAccountNum.selectOption({ index: fromAccountNumIndex });
        await this.toAccountNum.selectOption({ index: toAccountNumIndex });
        await this.transferButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    //assertions
    async verifyTransferFundsPageIsOpened() {
        await expect(this.page).toHaveURL(new RegExp(URLs.TransferFundsPage));
        await expect(this.transferFundsPageMessage).toBeVisible();
        await expect(this.amount).toBeVisible();
        await expect(this.fromAccountNum).toBeVisible();
        await expect(this.toAccountNum).toBeVisible();
        await expect(this.transferButton).toBeVisible();
    }

    async verifyTransferFundsPageIsNotOpened() {
        await expect(this.transferFundsPageMessage).not.toBeVisible();
        await expect(this.amount).not.toBeVisible();
        await expect(this.fromAccountNum).not.toBeVisible();
        await expect(this.toAccountNum).not.toBeVisible();
        await expect(this.transferButton).not.toBeVisible();
    }

    async verifyTransferIsComplete() {
        await expect(this.transferDone).toBeVisible();
        await expect(this.successfullyTransferMessage).toBeVisible();
    }
}