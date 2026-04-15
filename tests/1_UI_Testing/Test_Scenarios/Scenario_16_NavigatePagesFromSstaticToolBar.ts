import { test } from '../../Fixtures/fixtures';

export const scenario_16_NavigatePagesFromSstaticToolBar = () => {

    test.describe('Scenario 16: Navigate Pages From Static Tool Bar', () => {


        test('Navigate Pages From Static Tool Bar', async ({ homePage, registerPage, forgotLoginInfoPage, newAccountPage, accountsOverviewPage, accountDetailsPage, transactionDetailsPage, transferFundsPage, billPayPage, findTransactionsPage, updateProfilePage, requestLoanPage, testData, staticToolBarLinks }) => {
            await test.step('Go to the ParaBank website home page', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
            });

            await test.step('Verify that all the static toolbar links are visible', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Click on "Open New Account" CTA', async () => {
                await staticToolBarLinks.clickOnOpenNewAccount();
            });

            await test.step('Verify that the "New Account" page is opened', async () => {
                await newAccountPage.verifyNewAccountPageIsOpened();
            });

            await test.step('Click on "Accounts Overview" CTA', async () => {
                await staticToolBarLinks.clickOnAccountsOverview();
            });

            await test.step('Verify that the "Accounts Overview" page is opened', async () => {
                await accountsOverviewPage.verifyAccountsOverviewPageIsOpened();
            });

            await test.step('Click on "Transfer Funds" CTA', async () => {
                await staticToolBarLinks.clickOnTransferFundsCTA();
            });

            await test.step('Verify that the "Transfer Funds" page is opened', async () => {
                await transferFundsPage.verifyTransferFundsPageIsOpened();
            });

            await test.step('Click on "Bill Pay" CTA', async () => {
                await staticToolBarLinks.clickOnBillPay();
            });

            await test.step('Verify that the "Bill Pay" page is opened', async () => {
                await billPayPage.verifyBillPayPageIsOpened();
            });

            await test.step('Click on "Find Transactions" CTA', async () => {
                await staticToolBarLinks.clickOnFindTransactions();
            });

            await test.step('Verify that the "Find Transactions" page is opened', async () => {
                await findTransactionsPage.verifyFindTransactionsPageIsOpened();
            });


            await test.step('Click on "Update Contact Info" CTA', async () => {
                await staticToolBarLinks.clickOnUpdateContactInfo();
            });

            await test.step('Verify that the "Update Contact Info" page is opened', async () => {
                await updateProfilePage.verifyUpdateProfilePageIsOpened();
            });

            await test.step('Click on "Request Loan" CTA', async () => {
                await staticToolBarLinks.clickOnLoanRequest();
            });

            await test.step('Verify that the "Request Loan" page is opened', async () => {
                await requestLoanPage.verifyRequestLoanPageIsOpened();
            });

            await test.step('Log out from the customer account page', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 16 Finished');
            });
        });
    });
}