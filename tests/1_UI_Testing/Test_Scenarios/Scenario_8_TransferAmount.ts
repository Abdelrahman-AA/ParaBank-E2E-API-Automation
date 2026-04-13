import { test, expect } from '../Fixtures/fixtures';

export const scenario_8_TransferAmount = () => {

    test.describe('Scenario 8: Transfer Amount', () => {

        test('Transfer Amount', async ({ homePage, transferFundsPage, staticToolBarLinks, accountsOverviewPage, accountDetailsPage, transactionDetailsPage, testData }) => {
            await test.step('Go to the ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Open the "Transfer Funds" page', async () => {
                await staticToolBarLinks.clickOnTransferFunds();
                await transferFundsPage.verifyTransferFundsPageIsOpened();
            });

            await test.step('Enter Valid Transfer Amount', async () => {
                await transferFundsPage.makeTransfer(testData.financeData.amountToTransfer, 0, 1);
            });

            await test.step('Verify that the Success message is displayed', async () => {
                await transferFundsPage.verifyTransferIsComplete();
            });

            await test.step('Go to the "Accounts Overview" page', async () => {
                await staticToolBarLinks.clickOnAccountsOverview();
                await accountsOverviewPage.verifyAccountsOverviewPageIsOpened();
            });

            await test.step('get the main account number', async () => {
                await accountsOverviewPage.verifyAccountTableIsVisible();
                await accountsOverviewPage.captureMainAccountNumber();
            });

            await test.step('Open main account number from the overview', async () => {
                await accountsOverviewPage.verifyAccountTableIsVisible();
                await accountsOverviewPage.captureMainAccountNumber();
                await accountsOverviewPage.clickOnFirstAccount();
            });

            await test.step('Verify that the "Account Details" page is opened', async () => {
                await accountDetailsPage.verifyAccountDetailsPageIsOpened();
            });

            await test.step('Verify that the account number on the details page matches the one from the overview', async () => {
                await accountDetailsPage.verifyAccountNumber(await accountsOverviewPage.useMainAccountNumber());
            });

            await test.step('Navigate to "Account Activity"', async () => {
                await accountDetailsPage.openFundsTransferSentPage();
                await expect(accountDetailsPage.transactionTable).toBeVisible();
            });

            await test.step('Capture the transaction ID from "Funds Transfer Sent"', async () => {
                await accountDetailsPage.verifyFundsTransferSentCTAisVisible();
                await accountDetailsPage.captureCurrentTransactionId();
            });

            await test.step('Navigate to Transaction Details Page"', async () => {
                await accountDetailsPage.verifyFundsTransferSentCTAisVisible();
                await accountDetailsPage.clickOnFundsTransferSentCTA();
            });

            await test.step('Verify that the "Transaction Details" page is opened"', async () => {
                await transactionDetailsPage.verifyTransactionDetailsPageIsOpened();
            });

            await test.step('Verify that the transaction ID on the details page matches the one from the overview', async () => {
                await transactionDetailsPage.verifyTransactionId(await accountDetailsPage.useCurrentTransactionId());
            });

            await test.step('Verify the transferred amount appears correctly in the transaction details.', async () => {
                await expect(transactionDetailsPage.transferredAmount).toContainText(testData.financeData.amountToTransfer);
            });

            await test.step('Log out from the account', async () => {
                await staticToolBarLinks.logOutCTA.click();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 8 Finished');
            });

        });
    });
}


