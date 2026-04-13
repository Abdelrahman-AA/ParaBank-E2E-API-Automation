import { test, expect } from '../Fixtures/fixtures';

export const Scenario_9_SearchTransactionsById = () => {

    test.describe('Scenario 9: Search Transactions by Transaction ID', () => {

        test('Search Transactions by Transaction ID', async ({ homePage, staticToolBarLinks, findTransactionsPage, accountDetailsPage, testData }) => {
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

            await test.step('Enter a known Transaction ID and search', async () => {
                await findTransactionsPage.findTransactionById(await accountDetailsPage.useCurrentTransactionId());
            });

            await test.step('Verify the transaction with the given ID is found and displayed', async () => {
                await findTransactionsPage.verifyFoundTransactionIsSent();
            });

            await test.step('Log out and ensure the home page is displayed again', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 9 Finished');
            });
        });
    });
}