import { test, expect } from '../Fixtures/fixtures';

export const scenario_12_SearchTransactionsByTransactionAmount = () => {

    test.describe('Scenario 12: Search Transactions by Transaction Amount', () => {

        test('Search Transactions by Transaction Amount', async ({ homePage, staticToolBarLinks, findTransactionsPage, testData }) => {
            await test.step('Go to the ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Navigate to the "Find Transactions" page', async () => {
                await staticToolBarLinks.clickOnFindTransactions();
            });

            await test.step('Ensure the "Find Transactions" page is opened', async () => {
                await findTransactionsPage.verifyFindTransactionsPageIsOpened();
            });

            await test.step('Enter a known Transaction Amount and search', async () => {

                await findTransactionsPage.findTransactionByAmount(testData.financeData.amountToTransfer,1);
            });

            await test.step('Verify the transaction with the given amount is found and displayed', async () => {
                await findTransactionsPage.verifyFoundTransactionIsSent();
            });

            await test.step('Navigate to the "Find Transactions" page', async () => {
                await staticToolBarLinks.clickOnFindTransactions();
            });

            await test.step('Ensure the "Find Transactions" page is opened', async () => {
                await findTransactionsPage.verifyFindTransactionsPageIsOpened();
            });

            await test.step('Enter a known Transaction Amount and search', async () => {

                await findTransactionsPage.findTransactionByAmount(testData.financeData.amountToTransfer, 0);
            });

            await test.step('Verify the transaction with the given amount is found and displayed', async () => {
                await findTransactionsPage.verifyFoundTransactionIsReceived();
            });

            await test.step('Log out and ensure the home page is displayed again', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 12 Finished');
            });
        });
    });
}