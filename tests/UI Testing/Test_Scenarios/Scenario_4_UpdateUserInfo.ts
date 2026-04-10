import { updateProfileInfo } from '../Data/0_DataIndex';
import { expect, test } from '../Fixtures/fixtures';

export const scenario_4_UpdateUserInfo = () => {

    test.describe('Scenario 4: Update User Profile and Verify Changes', () => {

        test('Update User Profile and Verify Changes Persistence', async ({page, homePage, updateProfilePage, staticToolBarLinks }) => {

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

            await test.step('Open the "Update Profile" page', async () => {
                await updateProfilePage.goToUpdateProfilePage();
                await updateProfilePage.updateProfilePageIsOpened();
            });

            await test.step('Edit User Information and submit the form', async () => {
                await updateProfilePage.fillUpdateProfileForm();
                await updateProfilePage.submitUpdateProfileForm();
            });

            await test.step('Verify that the change is successful by checking for a success message', async () => {
                await updateProfilePage.updateSuccessfulMessageIsDisplayed();
            });

            await test.step('Refresh current view', async () => {
        await page.reload();
    });

            await test.step('Verify that the updated Name appears correctly in the welcome message', async () => {
                await staticToolBarLinks.welcomeMessageContainsName(updateProfileInfo.firstName + ' ' + updateProfileInfo.lastName, true);
            });

            await test.step('Log out from the "Update Profile" page', async () => {
                await staticToolBarLinks.logout();
                await homePage.homePageIsOpened();
            });

            await test.step('Log in again with the same credentials to ensure the profile was updated successfully', async () => {
                await homePage.login();
                await staticToolBarLinks.staticToolBarLinksIsVisible();
            });

            await test.step('Verify that the updated Name appears correctly in the welcome message', async () => {
                await staticToolBarLinks.welcomeMessageContainsName(updateProfileInfo.firstName + ' ' + updateProfileInfo.lastName);
                await staticToolBarLinks.staticToolBarLinksIsVisible();
            });

            await test.step('Reopen the "Update Profile" page and check that the updated User Data is saved in the form', async () => {
                await updateProfilePage.goToUpdateProfilePage();
                await updateProfilePage.verifyProfileDataUpdated();

            });

            await test.step('Log out from the "Update Profile" page', async () => {
                await staticToolBarLinks.logout();
                await homePage.homePageIsOpened();
            });

        });
    });
}
