import { test, expect } from '../Fixtures/fixtures';

export const Scenario_11_SearchTransactionsByDateRange = () => {

    test.describe('Scenario 11: Search Transactions by Date Range', () => {

        test('Search Transactions by Date Range', async ({ homePage, staticToolBarLinks, findTransactionsPage, testData }) => {
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

            await test.step('Enter a known Transaction Date Range and search', async () => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayDate = yesterday.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowDate = tomorrow.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
                await findTransactionsPage.findTransactionByDateRange(yesterdayDate, tomorrowDate,1);
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

            await test.step('Enter a known Transaction Date Range and search', async () => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayDate = yesterday.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowDate = tomorrow.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
                await findTransactionsPage.findTransactionByDateRange(yesterdayDate, tomorrowDate, 0);
            });

            await test.step('Verify the transaction with the given date is found and displayed', async () => {
                await findTransactionsPage.verifyFoundTransactionIsReceived();
            });

            await test.step('Log out and ensure the home page is displayed again', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 11 Finished');
            });
        });
    });
}