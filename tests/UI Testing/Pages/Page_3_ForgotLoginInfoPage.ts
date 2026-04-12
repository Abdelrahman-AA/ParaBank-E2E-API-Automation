import { expect, Locator, Page, test } from '@playwright/test';
import { URLs,TestDataInterfaces } from '../Data/0_DataIndex';

export class ForgotLoginInfoPage {

    //locators
    readonly forgotLoginInfoPageMessage: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly addressStreet: Locator;
    readonly addressCity: Locator;
    readonly addressState: Locator;
    readonly addressZipCode: Locator;
    readonly ssn: Locator;
    readonly findMyLoginInfoButton: Locator;
    readonly retrievedUNamePasswordMessage: Locator;
    readonly retrievedInfoParagraph: Locator;

    //constructor
    constructor(public page: Page) {
        this.forgotLoginInfoPageMessage = page.locator(".title");
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.addressStreet = page.locator("#address\\.street");
        this.addressCity = page.locator("#address\\.city");
        this.addressState = page.locator("#address\\.state");
        this.addressZipCode = page.locator("#address\\.zipCode");
        this.ssn = page.locator("#ssn");
        this.findMyLoginInfoButton = page.locator("input[value='Find My Login Info']");
        this.retrievedUNamePasswordMessage = page.locator("//p[contains(text(),'Your login information was located successfully. Y')]");
        this.retrievedInfoParagraph = page.locator('#rightPanel p').filter({ hasText: 'Username:' });
    }

    //methods
    async goToForgotLoginInfoPage() {
        await test.step(`Go to Forgot Login Info Page`, async () => {
            await this.page.goto(URLs.ForgotLoginInfoPage);
            await this.page.waitForLoadState('networkidle');
        });
    }

    async fillForgotLoginInfoForm(forgotLoginInfoData: TestDataInterfaces.ForgotLoginInfoData) {
        await test.step(`Fill the Forgot Login Info form`, async () => {
            await this.firstName.fill(forgotLoginInfoData.firstName);
            await this.lastName.fill(forgotLoginInfoData.lastName);
            await this.addressStreet.fill(forgotLoginInfoData.addressStreet);
            await this.addressCity.fill(forgotLoginInfoData.addressCity);
            await this.addressState.fill(forgotLoginInfoData.addressState);
            await this.addressZipCode.fill(forgotLoginInfoData.addressZipCode);
            await this.ssn.fill(forgotLoginInfoData.ssn);
        });
    }

    async findMyLoginInfo(forgotLoginInfoData?: TestDataInterfaces.ForgotLoginInfoData) {
        await test.step(`Submit Customer Lookup request`, async () => {
            if (forgotLoginInfoData) {
                await this.fillForgotLoginInfoForm(forgotLoginInfoData);
            }
            await this.findMyLoginInfoButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async verifyForgotLoginInfoPageIsOpened() {
        await test.step(`Assert that Forgot Login Info Page is opened`, async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.ForgotLoginInfoPage));
            await expect(this.forgotLoginInfoPageMessage).toBeVisible();
            await expect(this.forgotLoginInfoPageMessage).toHaveText('Customer Lookup');
            await expect(this.firstName).toBeVisible();
        });
    }

    async verifyRetrievedLoginInfoIsDisplayed(username: string, password: string) {
        await test.step(`Assert that retrieved login info is displayed`, async () => {
            await expect(this.retrievedUNamePasswordMessage).toBeVisible();
            await expect(this.retrievedInfoParagraph).toBeVisible();
            await expect(this.retrievedInfoParagraph).toContainText(`Username: ${username}`);
            await expect(this.retrievedInfoParagraph).toContainText(`Password: ${password}`);
        });
    }
}