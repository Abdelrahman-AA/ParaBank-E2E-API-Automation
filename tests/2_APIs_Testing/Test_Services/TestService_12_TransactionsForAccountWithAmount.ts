import { test } from '../../Fixtures/fixtures';
import {TestService_Base} from './01_TestServices_Base'

export const TestService_12_TransactionsForAccountWithAmount = () => {

    test('Verify Transactions For Account With Amount', async ({ service_0_Get_JSESSIONID, service_5_UesrAccounts, service_12_TransactionsForAccountWithAmount,testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const { response, duration } = await service_12_TransactionsForAccountWithAmount.getTransactionsForAccountWithAmount(accountID, testData.financeData.depositAmount, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Transactions For Account With Amount Response', async () => {
            await service_12_TransactionsForAccountWithAmount.verifyAPIResponseForAccountTransactionsWithAmount(response);
        });

        await test.step('Verify Transactions For Account With Amount', async () => {
            await service_12_TransactionsForAccountWithAmount.verifyTransactionsForAccountWithAmount(response, accountID, testData.financeData.depositAmount);
        });
    });
}