import { test } from '../Fixtures/fixtures';

export const scenario_3_RetrieveLoginInfo = () => {

    test.describe('Scenario 3: Retrieve Forgotten Login Information', () => {

        test('Go to ParaBank website, Open "Forgot Login Information" page, Enter required information, Retrieve login info, Verify displayed username and password, Log out if "Log Out" button is displayed', async ({ homePage, forgotLoginInfoPage, staticToolBarLinks,testData }) => {
            await test.step('Go to ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Open the "Forgot Login Information" page', async () => {
                await homePage.clickOnForgotLoginInfo();
                await forgotLoginInfoPage.verifyForgotLoginInfoPageIsOpened();
            });

            await test.step('Enter Valid Customer Information and Retrieve login info', async () => {
                await forgotLoginInfoPage.fillForgotLoginInfoForm(testData.forgotLoginInfoData);
                await forgotLoginInfoPage.findMyLoginInfo();
            });

            await test.step('Verify that the displayed username and password are correct based on the provided data', async () => {
                await forgotLoginInfoPage.verifyRetrievedLoginInfoIsDisplayed(testData.validUser.username, testData.validUser.password);
            });

            await test.step('Verify that User is already Looged in', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Log out from the customer account page', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });
        });
    });
}
