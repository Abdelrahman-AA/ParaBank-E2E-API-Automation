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
        // this.welcomeAndName = page.locator("p[class='smallText'] b");
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

    // async welcomeMessageContainsName(FName: string,LName : string , isSoft: boolean = false) {
    //     await test.step(`Verify that the welcome message contains the user's name`, async () => {
    //         const assertion = isSoft ? expect.soft(this.welcomeAndName) : expect(this.welcomeAndName);
    //         await assertion.toContainText((FName + ' ' + LName), { ignoreCase: true });
    //     });

    // }

    async verifyWelcomeMessageContainsName(FName: string, LName: string, isSoft: boolean = false) {
    await test.step(`Verify that the welcome message contains the user's name`, async () => {
        const fullName = `${FName} ${LName}`;
        const assertion = isSoft ? expect.soft(this.welcomeAndName) : expect(this.welcomeAndName);
        await assertion.toHaveText(new RegExp(`Welcome\\s+${fullName}`, 'i'));
    });
}
}