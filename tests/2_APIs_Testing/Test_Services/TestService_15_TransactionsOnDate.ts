import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

export const TestService_15_TransactionsOnDate = () => {

    test('Verify Transactions On Date', async ({ service_0_Get_JSESSIONID, service_5_UesrAccounts, service_15_TransactionsOnDate, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const today = TestService_Base.getFormattedReverseDate();
        const { response, duration } = await service_15_TransactionsOnDate.getTransactionOnDate(accountID, today, jSESSIONID);


        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Transactions On Date Response', async () => {
            await service_15_TransactionsOnDate.verifyAPIResponseForTransactionOnDate(response);
        });

        await test.step('Verify Transactions On Date', async () => {
            await service_15_TransactionsOnDate.verifyTransactionsOnDate(response, accountID, testData.financeData.depositAmount);
        });
    });
}