import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

export const TestService_17_RequestLoan = () => {
    let beforeBalance: string;

    test('Verify Request Loan', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_17_RequestLoan, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID = await service_2_LoginUser.useUserID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        beforeBalance = await service_5_UesrAccounts.getAccountBalance(userID, jSESSIONID);
        const { response, duration } = await service_17_RequestLoan.postRequestLoan(userID, accountID, testData.financeData.depositAmount, testData.financeData.downPayment, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Response For Request Loan', async () => {
            await service_17_RequestLoan.verifyAPIResponseForRequestLoan(response);
        });

    });


        test('Verify Account Balance After Loan Request', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts,service_17_RequestLoan, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_5_UesrAccounts.getUserAccounts(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API User Accounts Response', async () => {
            await service_5_UesrAccounts.verifyAPIUserAccountsResponse(response, userID);
        });

        await test.step('Verify Account Balance After Loan Request', async () => {
            await service_17_RequestLoan.verifyAccountBalanceAfterLoanRequest(response, beforeBalance, testData.financeData.downPayment);
        })
    });
}