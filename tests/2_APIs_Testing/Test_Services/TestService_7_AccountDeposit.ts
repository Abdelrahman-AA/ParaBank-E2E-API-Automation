import { test } from '../../Fixtures/fixtures';
import { Service_Base } from "../Services/01_Service_Base";


export const TestService_7_AccountDeposit = () => {
    test('Verify Account Deposit', async ({ service_0_Get_JSESSIONID, service_5_UesrAccounts, service_7_AccountDeposit, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const accountID = await service_5_UesrAccounts.useAccountID();
        const { response, duration } = await service_7_AccountDeposit.postAccountDeposit(accountID, testData.financeData.depositAmount, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await Service_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await Service_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Account Deposit Response', async () => {
            await service_7_AccountDeposit.verifyAPIResponseDeposit(response,testData.financeData.depositAmount, accountID);
        });
    });

        test('Verify Account Balance After Deposit', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_7_AccountDeposit, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_5_UesrAccounts.getUserAccounts(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await Service_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await Service_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API User Accounts Response', async () => {
            await service_5_UesrAccounts.verifyAPIUserAccountsResponse(response, userID);
        });

        await test.step('Verify Account Balance After Bill Pay', async () => {
            const OriginalBalance = await service_5_UesrAccounts.useOrginalAccountBalance();
            await service_7_AccountDeposit.verifyAccountBalanceAfterDiposit(response, OriginalBalance, testData.payeeData.amount, testData.financeData.depositAmount);
        })
    });
}
