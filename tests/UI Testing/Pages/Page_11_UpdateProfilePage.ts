import { expect, Locator, Page, test } from '@playwright/test';
import { URLs,UpdateProfileData } from '../Data/0_DataIndex';

export class UpdateProfilePage {

    // Locators
    readonly updateProfilePageMessage: Locator;
    readonly customerFirstName: Locator;
    readonly customerLastName: Locator;
    readonly customerAddressStreet: Locator;
    readonly customerAddressCity: Locator;
    readonly customerAddressState: Locator;
    readonly customerAddressZipCode: Locator;
    readonly customerPhoneNumber: Locator;
    readonly updateProfileButton: Locator;
    readonly successfulMessage: Locator;

    // Constructor
    constructor(public page: Page) {
        this.updateProfilePageMessage = page.locator("//h1[normalize-space()='Update Profile']");
        this.customerFirstName = page.locator("#customer\\.firstName");
        this.customerLastName = page.locator("#customer\\.lastName");
        this.customerAddressStreet = page.locator("#customer\\.address\\.street");
        this.customerAddressCity = page.locator("#customer\\.address\\.city");
        this.customerAddressState = page.locator("#customer\\.address\\.state");
        this.customerAddressZipCode = page.locator("#customer\\.address\\.zipCode");
        this.customerPhoneNumber = page.locator("#customer\\.phoneNumber");
        this.updateProfileButton = page.locator("//input[@value='Update Profile']");
        this.successfulMessage = page.locator('text=Profile Updated');
    }

    // Methods
    async goToUpdateProfilePage() {
        await test.step('Go to Update Profile Page', async () => {
            await this.page.goto(URLs.UpdateProfilePage);
            await this.page.waitForLoadState('networkidle');
        });
    }

    async fillUpdateProfileForm(updateProfileData: UpdateProfileData) {
        await test.step('Fill the Update Profile form', async () => {
            await this.customerFirstName.fill(updateProfileData.firstName);
            await this.customerLastName.fill(updateProfileData.lastName);
            await this.customerAddressStreet.fill(updateProfileData.address);
            await this.customerAddressCity.fill(updateProfileData.city);
            await this.customerAddressState.fill(updateProfileData.state);
            await this.customerAddressZipCode.fill(updateProfileData.zipCode);
            await this.customerPhoneNumber.fill(updateProfileData.phoneNumber);
        });
    }
    async submitUpdateProfileForm(updateProfileData?: UpdateProfileData) {
        await test.step('Submit Update Profile form', async () => {
            if (updateProfileData) {
                await this.fillUpdateProfileForm(updateProfileData);
            }
            await this.updateProfileButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async updateProfilePageIsOpened() {
        await test.step('Assert that Update Profile Page is opened', async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.UpdateProfilePage));
            await expect(this.updateProfilePageMessage).toBeVisible();
        });
    }
    async updateSuccessfulMessageIsDisplayed() {
        await test.step('Assert that successful message is displayed', async () => {
            await expect(this.successfulMessage).toBeVisible();
        });
    }
}