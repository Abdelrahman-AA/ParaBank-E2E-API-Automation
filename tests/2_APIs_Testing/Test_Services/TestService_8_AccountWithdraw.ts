import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

let beforeBalance: string;

export const TestService_8_AccountWithdraw = () => {
    test('Verify Account Withdraw', async ({ service_0_Get_JSESSIONID,service_2_LoginUser, service_5_UesrAccounts, service_8_AccountWithdraw, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        beforeBalance = await service_5_UesrAccounts.getAccountBalance(userID, jSESSIONID);
        const { response, duration } = await service_8_AccountWithdraw.postAccountWithdraw(accountID, testData.financeData.withdrawAmount, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Account Withdraw Response', async () => {
            await service_8_AccountWithdraw.verifyAPIResponseWithdraw(response, testData.financeData.withdrawAmount, accountID);
        });
    });

    test('Verify Account Balance After Withdraw', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_8_AccountWithdraw, testData }) => {
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

        await test.step('Verify Account Balance After Bill Pay', async () => {
            await service_8_AccountWithdraw.verifyAccountBalanceAfterWithdraw(response, beforeBalance, testData.financeData.withdrawAmount);
        })
    });
}
