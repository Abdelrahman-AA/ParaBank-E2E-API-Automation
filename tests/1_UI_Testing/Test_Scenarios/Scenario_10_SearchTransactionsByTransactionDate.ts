import { test, expect } from '../../Fixtures/fixtures';

export const scenario_10_SearchTransactionsByTransactionDate = () => {

    test.describe('Scenario 10: Search Transactions by Transaction Date', () => {

        test('Search Transactions by Transaction Date', async ({ homePage, staticToolBarLinks, findTransactionsPage, testData }) => {
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

            await test.step('Enter a known Transaction Date and search', async () => {
                await findTransactionsPage.findTransactionByDate(new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-'),1);
            });

            await test.step('Verify the transaction with the given date is found and displayed', async () => {
                await findTransactionsPage.verifyFoundTransactionIsSent();
            });

            await test.step('Navigate to the "Find Transactions" page', async () => {
                await staticToolBarLinks.clickOnFindTransactions();
            });

            await test.step('Ensure the "Find Transactions" page is opened', async () => {
                await findTransactionsPage.verifyFindTransactionsPageIsOpened();
            });

            await test.step('Enter a known Transaction Date and search', async () => {
                await findTransactionsPage.findTransactionByDate(new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-'), 0);
            });

            await test.step('Verify the transaction with the given date is found and displayed', async () => {
                await findTransactionsPage.verifyFoundTransactionIsReceived();
            });

            await test.step('Log out and ensure the home page is displayed again', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 10 Finished');
            });

        });
    });
}