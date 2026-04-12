import { test } from '../Fixtures/fixtures';

    export const scenario_6_OpenNewSAVINGSaccount = () => {

        test.describe('Scenario 5: Open New SAVINGS Account', () => {

            test('Open New SAVINGS Account', async ({ homePage, newAccountPage, staticToolBarLinks, userData }) => {
                await test.step('Go to the ParaBank website', async () => {
                    await homePage.goToHomePage();
                    await homePage.verifyHomePageIsOpened();
                });

                await test.step('Log in with valid credentials', async () => {
                    await homePage.login(userData.username,userData.password);
                    await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                });

                await test.step('Open the "New Account" page', async () => {
                    await staticToolBarLinks.openNewAccountCTA.click();
                    await newAccountPage.verifyNewAccountPageIsOpened();
                });

                await test.step('Choose the "SAVINGS" account type and open a new account', async () => {
                    await newAccountPage.openNewAccount('SAVINGS');
                });

                await test.step('Verify that the new account was successfully opened by SAVINGS for confirmation messages', async () => {
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
            });
        });
    }

    