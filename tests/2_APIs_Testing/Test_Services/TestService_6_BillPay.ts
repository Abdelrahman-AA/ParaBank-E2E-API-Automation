import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

export const TestService_6_BillPay = () => {
let beforeBalance: string;

    test('Verify Bill Pay', async ({ service_0_Get_JSESSIONID,service_2_LoginUser, service_5_UesrAccounts, service_6_BillPay, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        beforeBalance = await service_5_UesrAccounts.getAccountBalance(userID, jSESSIONID);

        const { response, duration } = await service_6_BillPay.postBillPay(accountID, testData.payeeData, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Bill Pay Response', async () => {
            await service_6_BillPay.verifyAPIBillPayResponse(response, testData.payeeData.name, accountID, testData.payeeData.amount);
        })
    });

    test('Verify Account Balance After Bill Pay', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_6_BillPay, testData }) => {
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
            await service_6_BillPay.verifyAccountBalanceAfterBillPay(response, beforeBalance, testData.payeeData.amount);
        })
    });
}
