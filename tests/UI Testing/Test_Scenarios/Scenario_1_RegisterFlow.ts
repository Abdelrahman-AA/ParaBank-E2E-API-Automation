import { test } from '../Fixtures/fixtures';

export const scenario_1_RegistrationFlow = () => {

    test.describe('Scenario 1: Registration Flow', () => {

        test('Go to Register Page from Home page and Register a new user and Log out', async ({ homePage, registerPage, staticToolBarLinks }) => {
            await test.step('Go to Home Page', async () => {
                await homePage.goToHomePage();
                await homePage.homePageIsOpened();
            });

            await test.step('Go to Register Page from Home page', async () => {
                await homePage.clickOnRegister();
                await registerPage.registerPageIsOpened();
            });

            await test.step('Register a new user', async () => {
                await registerPage.fillRegistrationForm();
                await registerPage.register();
                await registerPage.registrationSuccessMessageIsDisplayed();
            });

            await test.step('Log out from the successfully registered page', async () => {
                await staticToolBarLinks.logout();
                await homePage.homePageIsOpened();
            });

        });
    });
}