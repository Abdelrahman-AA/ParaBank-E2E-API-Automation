    /*
     Scenario 7:
        Bill Payment Process
            - Go to the ParaBank website.
            - Log in with valid credentials.
            - Open the "Bill Pay" page.
            - Enter the payee's name, address, phone number, account number, and amount.
            - Click the "Send Payment" button to submit the bill payment.
            - Verify that the bill payment was successful by checking for a success message.
            - Log out from the "Bill Pay" page.
            - Go back to the home page and verify that it is loaded successfully.
     */

import { test } from '../Fixtures/fixtures';

export const scenario_7_BillPaymentProcess = () =>{
    test.describe('Scenario 7: Bill Payment Process', () => {

        test('Bill Payment Process', async ({ homePage, billPayPage, staticToolBarLinks, userData,payeeData }) => {
            await test.step('Go to the ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(userData.username,userData.password);
                    await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Open the "Bill Pay" page', async () => {
                await staticToolBarLinks.billPayCTA.click();
                await billPayPage.verifyBillPayPageIsOpened();
            });

            await test.step('Enter Valid Bill Payment Data', async () => {
                await billPayPage.fillBillPayForm(payeeData);
            });

            await test.step('Click the "Send Payment" button to submit the bill payment', async () => {
                await billPayPage.sendPayment();
            });

            await test.step('Verify that the bill payment was successful by checking for a success message', async () => {
                await billPayPage.verifyBillPaymentCompleteIsDisplayed();
            });

            await test.step('Log out from the "Bill Pay" page', async () => {
                await staticToolBarLinks.logOutCTA.click();
                await homePage.verifyHomePageIsOpened();
            });
        });
    });
}
