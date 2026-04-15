import { test } from '../../Fixtures/fixtures';

export const scenario_15_PagesPrivateAccessCheckURLs = () => {

    test.describe('Scenario 15: Pages Private Access Check URLs', () => {


        test('Public Access Check', async ({ homePage, registerPage, forgotLoginInfoPage, newAccountPage, accountsOverviewPage, accountDetailsPage, transactionDetailsPage, transferFundsPage, billPayPage, findTransactionsPage, updateProfilePage, requestLoanPage, testData, staticToolBarLinks }) => {
            await test.step('Go to the ParaBank website home page URL', async () => {
                await homePage.goToHomePage();
            });

            await test.step('Verify that the "Home" page is opened', async () => {
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
            });

            await test.step('Go to the ParaBank website home page URL', async () => {
                await homePage.goToHomePage();
            });

            await test.step('Verify that the "Static Tool Bar" is visible ', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Go to the Register page URL', async () => {
                await registerPage.goToRegisterPage();
            });

            await test.step('Verify that the "Register" page is NOT opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await registerPage.verifyRegisterPageIsNotOpened();
            });

            await test.step('Go to Forgot Login Info Page URL', async () => {
                await forgotLoginInfoPage.goToForgotLoginInfoPage();
            });

            await test.step('Verify that the "Forgot Login Information" page is NOTopened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await forgotLoginInfoPage.verifyForgotLoginInfoPageIsNotOpened();
            });

            await test.step('Go To Open New Account Page URL', async () => {
                await newAccountPage.goToOpenNewAccountPage();
            });

            await test.step('Verify that the "New Account" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await newAccountPage.verifyNewAccountPageIsOpened();
            });

            await test.step('Go to Accounts Overview page URL', async () => {
                await accountsOverviewPage.goToAccountsOverviewPage();
            });

            await test.step('Verify that the "Accounts Overview" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await accountsOverviewPage.verifyAccountsOverviewPageIsOpened();
            });

            await test.step('Go to Account Details page URL', async () => {
                await accountDetailsPage.goToAccountDetailsPage(await accountsOverviewPage.useMainAccountNumber());
            });

            await test.step('Verify that the "Account Details" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await accountDetailsPage.verifyAccountDetailsPageIsOpened();
            });

            await test.step('Go to Transaction Details page URL', async () => {
                await transactionDetailsPage.goToTransactionDetailsPage(await accountDetailsPage.useCurrentTransactionId());
            });

            await test.step('Verify that the "Transaction Details" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await transactionDetailsPage.verifyTransactionDetailsPageIsOpened();
            });

            await test.step('Go to Transfer Funds page URL', async () => {
                await transferFundsPage.goToTransferFundsPage();
            });

            await test.step('Verify that the "Transfer Funds" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await transferFundsPage.verifyTransferFundsPageIsOpened();
            });

            await test.step('Go to Bill Pay page URL', async () => {
                await billPayPage.goToBillPayPage();
            });

            await test.step('Verify that the "Bill Pay" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await billPayPage.verifyBillPayPageIsOpened();
            });

            await test.step('Go to Find Transactions page URL', async () => {
                await findTransactionsPage.goToFindTransactionsPage();
            });

            await test.step('Verify that the "Find Transactions" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await findTransactionsPage.verifyFindTransactionsPageIsOpened();
            });

            await test.step('Go to Update Profile page URL', async () => {
                await updateProfilePage.goToUpdateProfilePage();
            });

            await test.step('Verify that the "Update Profile" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await updateProfilePage.verifyUpdateProfilePageIsOpened();
            });

            await test.step('Go to Request Loan page URL', async () => {
                await requestLoanPage.goToRequestLoanPage();
            });

            await test.step('Verify that the "Request Loan" page is opened', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await requestLoanPage.verifyRequestLoanPageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 15 Finished');
            });
        });
    });
};

