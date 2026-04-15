import { test } from '../../Fixtures/fixtures';

export const scenario_5_OpenNewCHECKINGaccount = () => {

    test.describe('Scenario 5: Open New CHECKING Account', () => {

        test('Open New CHECKING Account', async ({ homePage, newAccountPage, staticToolBarLinks, testData }) => {
            await test.step('Go to the ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Open the "New Account" page', async () => {
                await staticToolBarLinks.clickOnOpenNewAccount();
                await newAccountPage.verifyNewAccountPageIsOpened();
            });

            await test.step('Choose the "CHECKING" account type and open a new account', async () => {
                await newAccountPage.openNewAccount('CHECKING');
            });

            await test.step('Verify that the new account was successfully opened by checking for confirmation messages', async () => {
                await newAccountPage.verifyAccountOpenedSuccessfully();
            });

            await test.step('Navigate back to the home page and verify that the customer account page is successfully loaded', async () => {
                await homePage.goToHomePage();
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Log out from the customer account page', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 5 Finished');
            });
        });
    });
}

