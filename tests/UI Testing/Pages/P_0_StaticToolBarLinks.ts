import { expect, Locator, Page, test } from '@playwright/test';

export class staticToolBarLinks {

    //locators
    readonly openNewAccountCTA: Locator;
    readonly accountsOverviewCTA: Locator;
    readonly transferFundsCTA: Locator;
    readonly billPayCTA: Locator;
    readonly findTransactionsCTA: Locator;
    readonly updateContactInfoCTA: Locator;
    readonly requestLoanCTA: Locator;
    readonly logOutCTA: Locator;
    readonly welcomeAndName: Locator;

    //constructor
    constructor(public page: Page) {
        this.openNewAccountCTA = page.getByRole('link', { name: 'Open New Account' });
        this.accountsOverviewCTA = page.getByRole('link', { name: 'Accounts Overview' });
        this.transferFundsCTA = page.locator("a[href='transfer.htm']");
        this.billPayCTA = page.locator("a[href='billpay.htm']");
        this.findTransactionsCTA = page.getByRole('link', { name: 'Find Transactions' });
        this.updateContactInfoCTA = page.getByRole('link', { name: 'Update Contact Info' });
        this.requestLoanCTA = page.getByRole('link', { name: 'Request Loan' });
        this.logOutCTA = page.getByRole('link', { name: 'Log Out' });
        this.welcomeAndName = page.locator('p.smallText');
    }

    //methods

    async logout() {
        await test.step(`Click on Log Out link`, async () => {
            await this.logOutCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickOnOpenNewAccount() {
        await test.step(`Click on Open New Account Link`, async () => {
            await this.openNewAccountCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickOnAccountsOverview() {
        await test.step(`Click on Accounts Overview Link`, async () => {
            await this.accountsOverviewCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickOnTransferFundsCTA() {
        await test.step(`Click on Transfer Funds Link`, async () => {
            await this.transferFundsCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

      async clickOnTransferFunds() {
        await test.step(`Click on Transfer Funds Link`, async () => {
            await this.transferFundsCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickOnBillPay() {
        await test.step(`Click on Bill Pay Link`, async () => {
            await this.billPayCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickOnFindTransactions() {
        await test.step(`Click on Find Transactions Link`, async () => {
            await this.findTransactionsCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickOnUpdateContactInfo() {
        await test.step(`Click on Update Contact Info Link`, async () => {
            await this.updateContactInfoCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickOnLoanRequest() {
        await test.step(`Click on Loan Request Link`, async () => {
            await this.requestLoanCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async verifyStaticToolBarLinksIsVisible() {
        await test.step(`Verify that all the static toolbar links are visible`, async () => {
            await expect(this.welcomeAndName).toBeVisible();
            await expect(this.openNewAccountCTA).toBeVisible();
            await expect(this.accountsOverviewCTA).toBeVisible();
            await expect(this.transferFundsCTA).toBeVisible();
            await expect(this.billPayCTA).toBeVisible();
            await expect(this.findTransactionsCTA).toBeVisible();
            await expect(this.updateContactInfoCTA).toBeVisible();
            await expect(this.requestLoanCTA).toBeVisible();
            await expect(this.logOutCTA).toBeVisible();
        });
    }

        async verifyStaticToolBarLinksIsNotVisible() {
        await test.step(`Verify that all the static toolbar links are Not visible`, async () => {
            await expect(this.welcomeAndName).not.toBeVisible();
            await expect(this.openNewAccountCTA).not.toBeVisible();
            await expect(this.accountsOverviewCTA).not.toBeVisible();
            await expect(this.transferFundsCTA).not.toBeVisible();
            await expect(this.billPayCTA).not.toBeVisible();
            await expect(this.findTransactionsCTA).not.toBeVisible();
            await expect(this.updateContactInfoCTA).not.toBeVisible();
            await expect(this.requestLoanCTA).not.toBeVisible();
            await expect(this.logOutCTA).not.toBeVisible();
        });
    }

    async verifyWelcomeMessageContainsName(FName: string, LName: string, isSoft: boolean = false) {
    await test.step(`Verify that the welcome message contains the user's name`, async () => {
        const fullName = `${FName} ${LName}`;
        const assertion = isSoft ? expect.soft(this.welcomeAndName) : expect(this.welcomeAndName);
        await assertion.toHaveText(new RegExp(`Welcome\\s+${fullName}`, 'i'));
    });
}
}