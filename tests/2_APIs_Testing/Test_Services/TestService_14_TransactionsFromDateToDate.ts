import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

export const TestService_14_TransactionsFromDateToDate = () => {

    test('Verify Transactions From Date To Date', async ({ service_0_Get_JSESSIONID, service_5_UesrAccounts, service_14_TransactionsFromDateToDate, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const yesterday = TestService_Base.getFormattedReverseDate(-1);
        const tomorrow = TestService_Base.getFormattedReverseDate(+1);
        const { response, duration } = await service_14_TransactionsFromDateToDate.getTransactionFromDateToDate(accountID, yesterday, tomorrow, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Transactions From Date To Date Response', async () => {
            await service_14_TransactionsFromDateToDate.verifyAPIResponseForTransactionFromDateToDate(response);
        });

        await test.step('Verify Transactions With Month And Type', async () => {
            await service_14_TransactionsFromDateToDate.verifyTransactionsFromDateToDate(response, accountID, testData.financeData.depositAmount);
        });
    });
}