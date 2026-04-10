import { test } from '../Fixtures/fixtures';

export const scenario_2_LoginFlow = () => {

    test.describe('Scenario 2: Login Flow', () => {

        test('Go to ParaBank website, Log in with valid credentials, Verify account page, Log out and Verify redirection to home page', async ({ homePage, staticToolBarLinks }) => {
            await test.step('Go to ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.homePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login();
            });

            await test.step('Verify that the customer account page is loaded successfully', async () => {
                await staticToolBarLinks.staticToolBarLinksIsVisible();
                await staticToolBarLinks.welcomeMessageContainsName();
            });

            await test.step('Log out from the customer account page', async () => {
                await staticToolBarLinks.logout();
                await homePage.homePageIsOpened();
            });
        });
    });
}