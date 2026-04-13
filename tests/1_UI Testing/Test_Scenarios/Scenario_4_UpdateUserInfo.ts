import { expect, test } from '../Fixtures/fixtures';

export const scenario_4_UpdateUserInfo = () => {

    test.describe('Scenario 4: Update User Profile and Verify Changes', () => {

        test('Update User Profile and Verify Changes Persistence', async ({ page, homePage, updateProfilePage, staticToolBarLinks, testData }) => {

            await test.step('Go to ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
            });

            await test.step('Verify that the customer account page is loaded successfully', async () => {
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
                await staticToolBarLinks.verifyWelcomeMessageContainsName(testData.validUser.firstName, testData.validUser.lastName);
            });

            await test.step('Open the "Update Profile" page', async () => {
                await updateProfilePage.goToUpdateProfilePage();
                await updateProfilePage.verifyUpdateProfilePageIsOpened();
            });

            await test.step('Edit User Information and submit the form', async () => {
                await updateProfilePage.fillUpdateProfileForm(testData.updateProfileData);
                await updateProfilePage.submitUpdateProfileForm();
            });

            await test.step('Verify that the change is successful by checking for a success message', async () => {
                await updateProfilePage.verifyUpdateSuccessfulMessageIsDisplayed();
            });

            await test.step('Refresh current view', async () => {
                await page.reload();
            });

            await test.step('Verify that the updated Name appears correctly in the welcome message', async () => {
                await staticToolBarLinks.verifyWelcomeMessageContainsName(testData.updateProfileData.firstName, testData.updateProfileData.lastName, true);
            });

            await test.step('Log out from the "Update Profile" page', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in again with the same credentials to ensure the profile was updated successfully', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Verify that the updated Name appears correctly in the welcome message', async () => {
                await staticToolBarLinks.verifyWelcomeMessageContainsName(testData.updateProfileData.firstName, testData.updateProfileData.lastName);
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Reopen the "Update Profile" page and check that the updated User Data is saved in the form', async () => {
                await updateProfilePage.goToUpdateProfilePage();
                await updateProfilePage.verifyProfileDataUpdated(testData.updateProfileData);

            });

            await test.step('Log out from the "Update Profile" page', async () => {
                await staticToolBarLinks.logout();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 4 Finished');
            });

        });
    });
}
