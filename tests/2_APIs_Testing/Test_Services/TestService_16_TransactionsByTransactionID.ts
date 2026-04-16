import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

export const TestService_16_TransactionByTransactionID = () => {

    test('Verify Transactions By Transaction ID', async ({ service_0_Get_JSESSIONID, service_5_UesrAccounts, service_16_TransactionByTransactionID, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const transactionID = await service_16_TransactionByTransactionID.getStoredTransactionID();
        const { response, duration } = await service_16_TransactionByTransactionID.getTransactionByTransactionID(transactionID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Transactions By Transaction ID Response', async () => {
            await service_16_TransactionByTransactionID.verifyAPIResponseByTransactionID(response);
        });

        await test.step('Verify Transactions By Transaction ID', async () => {
            await service_16_TransactionByTransactionID.verifyTransactionByTransactionID(response, accountID, testData.financeData.depositAmount);
        });
    });
}