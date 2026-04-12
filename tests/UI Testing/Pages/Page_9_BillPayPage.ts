import { expect, Locator, Page, test } from '@playwright/test';
import { URLs,TestDataInterfaces } from '../Data/0_DataIndex';

export class BillPayPage {

    //locators
    readonly billPayPagePageMessage: Locator;
    readonly payeeName: Locator;
    readonly payeeAddressStreet: Locator;
    readonly payeeAddressCity: Locator;
    readonly payeeAddressState: Locator;
    readonly payeeAddressZipCode: Locator;
    readonly payeePhoneNumber: Locator;
    readonly payeeAccountNumber: Locator;
    readonly verifyAccount: Locator;
    readonly amount: Locator;
    readonly fromAccountId: Locator;
    readonly sendPaymentButton: Locator;
    readonly billPaymentComplete: Locator;

    //constructor
    constructor(public page: Page) {
        this.billPayPagePageMessage = page.locator("//h1[normalize-space()='Bill Payment Service']");
        this.payeeName = page.locator("//input[@name='payee.name']");
        this.payeeAddressStreet = page.locator("//input[@name='payee.address.street']");
        this.payeeAddressCity = page.locator("//input[@name='payee.address.city']");
        this.payeeAddressState = page.locator("//input[@name='payee.address.state']");
        this.payeeAddressZipCode = page.locator("//input[@name='payee.address.zipCode']");
        this.payeePhoneNumber = page.locator("input[name='payee.phoneNumber']");
        this.payeeAccountNumber = page.locator("//input[@name='payee.accountNumber']");
        this.verifyAccount = page.locator("//input[@name='verifyAccount']");
        this.amount = page.locator("//input[@name='amount']");
        this.fromAccountId = page.locator("//select[@name='fromAccountId']");
        this.sendPaymentButton = page.locator("//input[@value='Send Payment']");
        this.billPaymentComplete = page.locator("//h1[@class='title' and text()='Bill Payment Complete']");
    }

    //methods
    async goToBillPayPage() {
        await test.step('Go to Bill Pay Page', async () => {
            await this.page.goto(URLs.BillPayPage);
            await this.page.waitForLoadState('networkidle');
        })
    }

    async fillBillPayForm(payeeData: TestDataInterfaces.PayeeData, index: number = 0) {
        await test.step('Fill the Bill Pay form', async () => {
            await this.payeeName.fill(payeeData.name);
            await this.payeeAddressStreet.fill(payeeData.addressStreet);
            await this.payeeAddressCity.fill(payeeData.addressCity);
            await this.payeeAddressState.fill(payeeData.addressState);
            await this.payeeAddressZipCode.fill(payeeData.addressZipCode);
            await this.payeePhoneNumber.fill(payeeData.phoneNumber);
            await this.payeeAccountNumber.fill(payeeData.accountNumber);
            await this.verifyAccount.fill(payeeData.verifyAccount);
            await this.amount.fill(payeeData.amount);
            await this.fromAccountId.selectOption({ index: index });
        });
    }
    async sendPayment(payeeData?: TestDataInterfaces.PayeeData) {
        await test.step('Submit payment request', async () => {
            if (payeeData) {
                await this.fillBillPayForm(payeeData);
            }
            await this.sendPaymentButton.click();
            await this.page.waitForLoadState('networkidle');
        });
        }

    //assertions
    async verifyBillPayPageIsOpened() {
        
        await test.step(`Assert that Bill Pay page is opened`, async () => {
            await expect(this.page).toHaveURL(new RegExp(URLs.BillPayPage));
            await expect(this.billPayPagePageMessage).toBeVisible();
        });
    }
    async verifyBillPaymentCompleteIsDisplayed() {
        await test.step(`Assert that Bill Payment Complete message is displayed`, async () => {
            await expect(this.billPaymentComplete).toBeVisible();
        });
    }
    }