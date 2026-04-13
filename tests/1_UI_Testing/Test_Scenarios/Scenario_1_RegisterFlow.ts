import { test } from '../Fixtures/fixtures';

export const scenario_1_RegistrationFlow = () => {

    test.describe('Scenario 1: Registration Flow', () => {

        test('Go to Register Page from Home page and Register a new user and Log out', async ({ homePage, registerPage, staticToolBarLinks, testData }) => {
            await test.step('Go to Home Page', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Go to Register Page from Home page', async () => {
                await homePage.clickOnRegister();
                await registerPage.verifyRegisterPageIsOpened();
            });

            await test.step('Register a new user', async () => {
                await registerPage.fillRegistrationForm(testData.validUser);
                await registerPage.register();
                const isSuccess = await registerPage.verifyRegistrationSuccessMessageIsDisplayed(testData.validUser.username);
                if (!isSuccess) {
                    console.error('🛑 CRITICAL FAILURE: Registration failed. Stopping the entire run...');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    (globalThis as any).process.kill((globalThis as any).process.ppid, 'SIGTERM');
                    (globalThis as any).process.exit(1);
                }
            });

            await test.step('Log out from the successfully registered page', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 1 Finished');
            });

        });
    });
}