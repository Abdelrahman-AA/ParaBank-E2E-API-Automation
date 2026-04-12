import { test } from '../Fixtures/fixtures';

export const scenario_7_BillPaymentProcess = () => {
    test.describe('Scenario 7: Bill Payment Process', () => {

        test('Bill Payment Process', async ({ homePage, billPayPage, staticToolBarLinks, testData }) => {
            await test.step('Go to the ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Open the "Bill Pay" page', async () => {
                await staticToolBarLinks.clickOnBillPay();
                await billPayPage.verifyBillPayPageIsOpened();
            });

            await test.step('Enter Valid Bill Payment Data', async () => {
                await billPayPage.fillBillPayForm(testData.payeeData);
            });

            await test.step('Click the "Send Payment" button to submit the bill payment', async () => {
                await billPayPage.sendPayment();
            });

            await test.step('Verify that the bill payment was successful by checking for a success message', async () => {
                await billPayPage.verifyBillPaymentCompleteIsDisplayed();
            });

            await test.step('Log out from the "Bill Pay" page', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 7 Finished');
            });
        });
    });
}
