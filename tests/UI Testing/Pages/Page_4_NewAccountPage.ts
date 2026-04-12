import { expect, Locator, Page, test } from '@playwright/test';
import { URLs } from '../Data/0_DataIndex';

export class NewAccountPage {

    //locators
    readonly openNewAccountPageWelcomeMessage: Locator;
    readonly accountType: Locator;
    readonly openNewAccountButton: Locator;
    readonly accountOpened: Locator;
    readonly successfullyAccountOpenedMessage: Locator;

    //constructor
    constructor(public page: Page) {
        this.openNewAccountPageWelcomeMessage = page.locator("//h1[@class='title' and text()='Open New Account']");
        this.accountType = page.locator("#type");
        this.openNewAccountButton = page.locator("input[value='Open New Account']");
        this.accountOpened = page.locator("//h1[@class='title' and text()='Account Opened!']");
        this.successfullyAccountOpenedMessage = page.locator("//p[text()='Congratulations, your account is now open.']");
    }

    //methods
    async goToOpenNewAccountPage() {
        await test.step(`Go To Open New Account Page`, async () => {
            await this.page.goto(URLs.OpenNewAccountPage);
            await this.page.waitForLoadState('networkidle');
        });
    }
    async openNewAccount(type: 'CHECKING' | 'SAVINGS') {
        await expect(this.accountType).toBeEditable();
        const index = type === 'CHECKING' ? 0 : 1;
        await test.step(`Open a new ${type} account`, async () => {
            await this.accountType.selectOption({ index: index });
            await this.page.waitForLoadState('networkidle');
            await this.openNewAccountButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async verifyNewAccountPageIsOpened() {
        await test.step(`Assert that Open New Account page is opened`, async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.OpenNewAccountPage));
            await expect(this.openNewAccountPageWelcomeMessage).toBeVisible();
            await expect(this.accountType).toBeVisible();
        });
    }

        async verifyNewAccountPageIsNotOpened() {
        await test.step(`Assert that Open New Account page is Not opened`, async () => {
            await expect(this.openNewAccountPageWelcomeMessage).not.toBeVisible();
            await expect(this.accountType).not.toBeVisible();
        });
    }

    async verifyAccountOpenedSuccessfully() {
        await test.step(`Assert that new account is opened successfully`, async () => {
            await expect(this.accountOpened).toBeVisible();
            await expect(this.successfullyAccountOpenedMessage).toBeVisible();
        });
    }
}