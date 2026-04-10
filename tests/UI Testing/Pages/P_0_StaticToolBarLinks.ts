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
        this.transferFundsCTA = page.getByRole('link', { name: 'Transfer Funds' });
        this.billPayCTA = page.getByRole('link', { name: 'Bill Pay' });
        this.findTransactionsCTA = page.getByRole('link', { name: 'Find Transactions' });
        this.updateContactInfoCTA = page.getByRole('link', { name: 'Update Contact Info' });
        this.requestLoanCTA = page.getByRole('link', { name: 'Request Loan' });
        this.logOutCTA = page.getByRole('link', { name: 'Log Out' });
        this.welcomeAndName = page.locator("//p[@class='smallText']");
    }

    //methods
    async logout() {
        await test.step(`Click on Log Out link`, async () => {
            await this.logOutCTA.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    
    }