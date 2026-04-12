import { expect, Locator, Page, test } from '@playwright/test';
import { URLs, TestDataInterfaces } from '../Data/0_DataIndex';

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

    async fillUpdateProfileForm(updateProfileData: TestDataInterfaces.UpdateProfileData) {
        await test.step('Fill the Update Profile form', async () => {
            await this.customerFirstName.clear();
            await this.customerLastName.clear();
            await this.customerAddressStreet.clear();
            await this.customerAddressCity.clear();
            await this.customerAddressState.clear();
            await this.customerAddressZipCode.clear();
            await this.customerPhoneNumber.clear();

            await this.customerFirstName.fill(updateProfileData.firstName);
            await this.customerLastName.fill(updateProfileData.lastName);
            await this.customerAddressStreet.fill(updateProfileData.address);
            await this.customerAddressCity.fill(updateProfileData.city);
            await this.customerAddressState.fill(updateProfileData.state);
            await this.customerAddressZipCode.fill(updateProfileData.zipCode);
            await this.customerPhoneNumber.fill(updateProfileData.phoneNumber);
        });
    }
    async submitUpdateProfileForm(updateProfileData?: TestDataInterfaces.UpdateProfileData) {
        await test.step('Submit Update Profile form', async () => {
            if (updateProfileData) {
                await this.fillUpdateProfileForm(updateProfileData);
            }
            await this.updateProfileButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async verifyUpdateProfilePageIsOpened() {
        await test.step('Assert that Update Profile Page is opened', async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.UpdateProfilePage));
            await expect(this.updateProfilePageMessage).toBeVisible();
        });
    }
    async verifyUpdateSuccessfulMessageIsDisplayed() {
        await test.step('Assert that successful message is displayed', async () => {
            await expect(this.successfulMessage).toBeVisible();
        });
    }

    async verifyProfileDataUpdated(updateProfileData: TestDataInterfaces.UpdateProfileData) {
        await test.step('Assert that updated data is still persisted correctly', async () => {

            await expect(this.customerFirstName).toHaveValue(updateProfileData.firstName);
            await expect(this.customerLastName).toHaveValue(updateProfileData.lastName);
            await expect(this.customerAddressStreet).toHaveValue(updateProfileData.address);
            await expect(this.customerAddressCity).toHaveValue(updateProfileData.city);
            await expect(this.customerAddressState).toHaveValue(updateProfileData.state);
            await expect(this.customerAddressZipCode).toHaveValue(updateProfileData.zipCode);
            await expect(this.customerPhoneNumber).toHaveValue(updateProfileData.phoneNumber);
        });

    }
}