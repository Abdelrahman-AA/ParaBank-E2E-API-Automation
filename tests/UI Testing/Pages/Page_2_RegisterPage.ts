import { expect, Locator, Page, test } from '@playwright/test';
import { URLs,TestDataInterfaces } from '../Data/0_DataIndex';

export class RegisterPage {

    //locators
    readonly registerPage_WelcomeMessage: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly addressField: Locator;
    readonly cityField: Locator;
    readonly stateField: Locator;
    readonly zipCodeField: Locator;
    readonly phoneNumberField: Locator;
    readonly ssnField: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly confirmPasswordField: Locator;
    readonly registerButton: Locator;
    readonly registrationSuccessMessageWithUsername: Locator;
    readonly registrationSuccessMessage: Locator;

    //constructor
    constructor(public page: Page) {
        this.registerPage_WelcomeMessage = page.getByRole('heading', { name: 'Signing up is easy!' });
        this.firstNameField = page.locator('input[name="customer.firstName"]');
        this.lastNameField = page.locator('input[name="customer.lastName"]');
        this.addressField = page.locator('input[name="customer.address.street"]');
        this.cityField = page.locator('input[name="customer.address.city"]');
        this.stateField = page.locator('input[name="customer.address.state"]');
        this.zipCodeField = page.locator('input[name="customer.address.zipCode"]');
        this.phoneNumberField = page.locator('input[name="customer.phoneNumber"]');
        this.ssnField = page.locator('input[name="customer.ssn"]');
        this.usernameField = page.locator('input[name="customer.username"]');
        this.passwordField = page.locator('input[name="customer.password"]');
        this.confirmPasswordField = page.locator('#repeatedPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.registrationSuccessMessageWithUsername = page.locator('.title');
        this.registrationSuccessMessage = page.locator("div[id='rightPanel'] p");
    }

    //methods
    async goToRegisterPage() {
        await test.step('Go to Register Page', async () => {
            await this.page.goto(URLs.RegisterPage);
            await this.page.waitForLoadState('networkidle');
        })
    }

    async fillRegistrationForm(registrationData: TestDataInterfaces.RegistrationData) {
        await test.step('Fill the registration form', async () => {
            await this.firstNameField.fill(registrationData.firstName);
            await this.lastNameField.fill(registrationData.lastName);
            await this.addressField.fill(registrationData.address);
            await this.cityField.fill(registrationData.city);
            await this.stateField.fill(registrationData.state);
            await this.zipCodeField.fill(registrationData.zipCode);
            await this.phoneNumberField.fill(registrationData.phoneNumber);
            await this.ssnField.fill(registrationData.ssn);
            await this.usernameField.fill(registrationData.username);
            await this.passwordField.fill(registrationData.password);
            await this.confirmPasswordField.fill(registrationData.passwordConfirmation);
        });
    }

    async register(registrationData?: TestDataInterfaces.RegistrationData) {
        await test.step('Submit Registration request', async () => {
            if (registrationData) {
                await this.fillRegistrationForm(registrationData);
            }
            await this.registerButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    //assertions
    async verifyRegisterPageIsOpened() {
        await test.step('Assert that Register Page is opened', async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.RegisterPage));
            await expect(this.registerPage_WelcomeMessage).toBeVisible();
            await expect(this.firstNameField).toBeVisible();
        });
    }

    async verifyRegistrationSuccessMessageIsDisplayed(username: string) :Promise<boolean>{
       return await test.step('Assert that registration success message is displayed', async () => {
            try {
            await expect(this.registrationSuccessMessageWithUsername).toContainText(`Welcome ${username}`);
            await expect(this.registrationSuccessMessage).toHaveText('Your account was created successfully. You are now logged in.');
            return true;
            } catch (error) {
                return false;
            }
        });
    }

}