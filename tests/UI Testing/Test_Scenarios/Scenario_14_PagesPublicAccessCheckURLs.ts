import { test } from '../Fixtures/fixtures';

export const Scenario_14_PagesPublicAccessCheckURLs = () => {

    test.describe('Scenario 14: Pages Public Access Check URLs', () => {


        test('Public Access Check', async ({ homePage, registerPage, forgotLoginInfoPage, newAccountPage, accountsOverviewPage, accountDetailsPage, transactionDetailsPage, transferFundsPage, billPayPage, findTransactionsPage, updateProfilePage, requestLoanPage, staticToolBarLinks }) => {
            await test.step('Go to the ParaBank website home page URL', async () => {
                await homePage.goToHomePage();
            });

            await test.step('Verify that the "Home" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to the Register page URL', async () => {
                await registerPage.goToRegisterPage();
            });

            await test.step('Verify that the "Register" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await registerPage.verifyRegisterPageIsOpened();
            });

            await test.step('Go to Forgot Login Info Page URL', async () => {
                await forgotLoginInfoPage.goToForgotLoginInfoPage();
            });

            await test.step('Verify that the "Forgot Login Information" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await forgotLoginInfoPage.verifyForgotLoginInfoPageIsOpened();
            });

            await test.step('Go To Open New Account Page URL', async () => {
                await newAccountPage.goToOpenNewAccountPage();
            });

            await test.step('Verify that the "New Account" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await newAccountPage.verifyNewAccountPageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Accounts Overview page URL', async () => {
                await accountsOverviewPage.goToAccountsOverviewPage();
            });

            await test.step('Verify that the "Accounts Overview" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await accountsOverviewPage.verifyAccountsOverviewPageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Account Details page URL', async () => {
                await accountDetailsPage.goToAccountDetailsPage(await accountsOverviewPage.useMainAccountNumber());
            });

            await test.step('Verify that the "Account Details" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await accountDetailsPage.verifyAccountDetailsPageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Transaction Details page URL', async () => {
                await transactionDetailsPage.goToTransactionDetailsPage(await accountDetailsPage.useCurrentTransactionId());
            });

            await test.step('Verify that the "Transaction Details" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await transactionDetailsPage.verifyTransactionDetailsPageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Transfer Funds page URL', async () => {
                await transferFundsPage.goToTransferFundsPage();
            });

            await test.step('Verify that the "Transfer Funds" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await transferFundsPage.verifyTransferFundsPageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Bill Pay page URL', async () => {
                await billPayPage.goToBillPayPage();
            });

            await test.step('Verify that the "Bill Pay" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await billPayPage.verifyBillPayPageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Find Transactions page URL', async () => {
                await findTransactionsPage.goToFindTransactionsPage();
            });

            await test.step('Verify that the "Find Transactions" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await findTransactionsPage.verifyFindTransactionsPageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Update Profile page URL', async () => {
                await updateProfilePage.goToUpdateProfilePage();
            });

            await test.step('Verify that the "Update Profile" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await updateProfilePage.verifyUpdateProfilePageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Request Loan page URL', async () => {
                await requestLoanPage.goToRequestLoanPage();
            });

            await test.step('Verify that the "Request Loan" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsNotVisible();
                await requestLoanPage.verifyRequestLoanPageIsNotOpened();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 14 Finished');
            });
        });
    });
};

