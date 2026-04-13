import { test, expect } from '../Fixtures/fixtures';

export const Scenario_13_RequestLoanAndVerifyApproval = () => {

    test.describe('Scenario 13: Request Loan and Verify Approval', () => {

        test('Request Loan and Verify Approval', async ({ homePage, staticToolBarLinks, requestLoanPage, testData }) => {
            await test.step('Go to the ParaBank website', async () => {
                await homePage.goToHomePage();
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Log in with valid credentials', async () => {
                await homePage.login(testData.validUser.username, testData.validUser.password);
                await staticToolBarLinks.verifyStaticToolBarLinksIsVisible();
            });

            await test.step('Navigate to the "Request Loan" page', async () => {
                await staticToolBarLinks.clickOnLoanRequest();
            });

            await test.step('Ensure the "Request Loan" page is opened', async () => {
                await requestLoanPage.verifyRequestLoanPageIsOpened();
            });

            await test.step('Fill in the required loan information and submit the request', async () => {
                await requestLoanPage.applyForLoan(testData.financeData.loanAmount, testData.financeData.downPayment);
            });

            await test.step('Verify that the loan request has been successfully processed', async () => {
                await requestLoanPage.verifyLoanRequestIsProcessed();
            });

            await test.step('Confirm that the loan has been approved', async () => {
                await requestLoanPage.verifyLoanIsApproved();
            });

            await test.step('Log out from the account', async () => {
                await staticToolBarLinks.logout();
            });

            await test.step('Ensure that the home page is displayed again', async () => {
                await homePage.verifyHomePageIsOpened();
            });

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 13 Finished');
            });
        });
    });
};