import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

export const TestService_13_TransactionsWithMonthAndType = () => {

    test('Verify Transactions With Month And Type', async ({ service_0_Get_JSESSIONID, service_5_UesrAccounts, service_13_TransactionsWithMonthAndType, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const { response, duration } = await service_13_TransactionsWithMonthAndType.getTransactionWithMonthAndType(accountID, (new Date().toLocaleString('en-US', { month: 'long' })), "Credit", jSESSIONID);
        
        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Transactions With Month And Type Response', async () => {
            await service_13_TransactionsWithMonthAndType.verifyAPIResponseForTransactionWithMonthAndType(response);
        });

        await test.step('Verify Transactions With Month And Type', async () => {
            await service_13_TransactionsWithMonthAndType.verifyTransactionsWithMonthAndType(response, accountID, testData.financeData.depositAmount);
        });
    });
}