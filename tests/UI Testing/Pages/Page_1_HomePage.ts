import { expect, Locator, Page, test } from '@playwright/test';
import { URLs } from '../Data/0_DataIndex';

export class HomePage {

    //locators
    readonly logo: Locator;
    readonly userNameField: Locator;
    readonly passwordField: Locator;
    readonly loginbutton: Locator;
    readonly registerCTA: Locator;
    readonly forgotLoginInfoCTA: Locator;

    //constructor
    constructor(public page: Page) {
        this.logo = page.getByAltText('ParaBank');
        this.userNameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input[name="password"]');
        this.loginbutton = page.getByRole('button', { name: 'Log In' });
        this.registerCTA = page.getByRole('link', { name: 'Register' });
        this.forgotLoginInfoCTA = page.getByRole('link', { name: 'Forgot Login Info?' });
    }

    //methods
    async goToHomePage() {
        await test.step(`Go to Home Page`, async () => {
            await this.page.goto(URLs.HOMEPage);
            await this.page.waitForLoadState('networkidle');
        });
    }

    async clickOnRegister() {
        await test.step(`Click on Register Link`, async () => {
            await this.registerCTA.click();
            await this.page.waitForLoadState('networkidle');
        });

    }

    async clickOnForgotLoginInfo() {
        await test.step(`Click on Forgot Login Info Link`, async () => {
            await this.forgotLoginInfoCTA.click();
            await this.page.waitForLoadState('networkidle');
        });

    }

    async login(username: string, password: string) {
        await test.step(`Login with user: ${username}`, async () => {
            await this.userNameField.fill(username);
            await this.passwordField.fill(password);
            await this.loginbutton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async homePageIsOpened() {
        await test.step(`Assert that Home Page is opened`, async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.HOMEPage));
        await expect(this.logo).toBeVisible();
        await expect(this.userNameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.loginbutton).toBeVisible();
        await expect(this.registerCTA).toBeVisible();
        await expect(this.forgotLoginInfoCTA).toBeVisible();
    });
}

}