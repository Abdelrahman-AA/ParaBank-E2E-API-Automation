import { expect, Locator, Page, test } from '@playwright/test';
import { URLs } from '../Data/0_DataIndex';

export class RequestLoanPage {

    //locators
    readonly applyForLoanPageMessage: Locator;
    readonly loanAmount: Locator;
    readonly downPayment: Locator;
    readonly fromAccount: Locator;
    readonly applyNowButton: Locator;
    readonly loanRequestProcessed: Locator;
    readonly loanApproved: Locator;

    //constructor
    constructor(public page: Page) {
        this.applyForLoanPageMessage = page.locator("//h1[normalize-space()='Apply for a Loan']");
        this.loanAmount = page.locator("#amount");
        this.downPayment = page.locator("#downPayment");
        this.fromAccount = page.locator("#fromAccountId");
        this.applyNowButton = page.locator("//input[@value='Apply Now']");
        this.loanRequestProcessed = page.locator("//h1[normalize-space()='Loan Request Processed']");
        this.loanApproved = page.locator("#loanStatus");
    }

    //methods
    async goToRequestLoanPage() {
        await test.step('Go to Request Loan Page', async () => {
            await this.page.goto(URLs.RequestLoanPage);
            await this.page.waitForLoadState('networkidle');
        });
    }

async applyForLoan(amount: string, downPayment: string, fromAccountIndex: number = 0) {
    await test.step(`Apply for loan with amount $${amount}, down payment $${downPayment} from account index ${fromAccountIndex}`, async () => {
        await this.loanAmount.fill(amount);
        await this.downPayment.fill(downPayment);
        await this.fromAccount.selectOption({index : fromAccountIndex});
        await this.applyNowButton.click();
        await this.page.waitForLoadState('networkidle');
    });}

    //assertions
    async requestLoanPageIsOpened() {
        await test.step('Assert that Request Loan page is opened', async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.RequestLoanPage));
            await expect(this.applyForLoanPageMessage).toBeVisible();
            await expect(this.fromAccount).toBeVisible();
        });
    }

    async loanRequestIsProcessed() {
        await test.step('Assert that loan request is processed', async () => {
            await expect(this.loanRequestProcessed).toBeVisible();
            await expect(this.loanApproved).toBeVisible();
        });}
}