import { test, expect } from '../Fixtures/fixtures';

export const scenario_8_TransferAmount = () => {

    test.describe('Scenario 8: Transfer Amount', () => {

        let mainAccountNumber: string = '';
        let currentTransactionId: string = '';

        test('Transfer Amount', async ({ homePage, transferFundsPage, staticToolBarLinks, accountsOverviewPage, accountDetailsPage, transactionDetailsPage, userData, financeData }) => {
            await test.step('Go to the ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(userData.username, userData.password);
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Open the "Transfer Funds" page', async () => {
                await staticToolBarLinks.transferFundsCTA.click();
                await transferFundsPage.verifyTransferFundsPageIsOpened();
            });

            await test.step('Enter Valid Transfer Amount', async () => {
                await transferFundsPage.makeTransfer(financeData.amountToTransfer, 0, 1);
            });

            await test.step('Verify that the Success message is displayed', async () => {
                await transferFundsPage.verifyTransferIsComplete();
            });

            await test.step('Go to the "Accounts Overview" page', async () => {
                await staticToolBarLinks.accountsOverviewCTA.click();
                await accountsOverviewPage.verifyAccountsOverviewPageIsOpened();
            });

            await test.step('Open main account number from the overview', async () => {
                await accountsOverviewPage.accountTable.isVisible();
                const accountText = await accountsOverviewPage.firstAccountLink.textContent();
                mainAccountNumber = accountText ? accountText.trim() : '';
                await accountsOverviewPage.firstAccountLink.click();
            });

            await test.step('Verify that the "Account Details" page is opened', async () => {
                await accountDetailsPage.verifyAccountDetailsPageIsOpened();
            });

            await test.step('Verify that the account number on the details page matches the one from the overview', async () => {
                await accountDetailsPage.verifyAccountNumber(mainAccountNumber);
            });

            await test.step('Navigate to "Account Activity"', async () => {
                await accountDetailsPage.goAccountActivityButton.click();
                await expect(accountDetailsPage.transactionTable).toBeVisible();
            });

await test.step('Navigate to "Funds Transfer Sent"', async () => {
                await expect(accountDetailsPage.fundsTransferSentCTA).toBeVisible();
                const href = await accountDetailsPage.fundsTransferSentCTA.getAttribute('href');
                if (href) {
                    const match = href.match(/id=(\d+)/);
                    currentTransactionId = match ? match[1] : '';
                }
                console.log(`Debug: Captured ID from href is -> ${currentTransactionId}`);
                await accountDetailsPage.fundsTransferSentCTA.click();
                await transactionDetailsPage.verifyTransactionDetailsPageIsOpened();
            });

            await test.step('Verify the Account ID', async () => {
                await transactionDetailsPage.verifyTransactionId(currentTransactionId);
            });

            await test.step('Verify the transferred amount appears correctly in the transaction details.', async () => {
                await expect(transactionDetailsPage.transferredAmount).toContainText(financeData.amountToTransfer);
            });

            await test.step('Log out from the account', async () => {
                await staticToolBarLinks.logOutCTA.click();
                await homePage.verifyHomePageIsOpened();
            });
        });
    });
}


