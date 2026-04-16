import { test } from '../../Fixtures/fixtures';
import {TestService_Base} from './01_TestServices_Base'

export const TestService_11_TransactionsForAccount = () => {

    test('Verify Transactions For Account', async ({ service_0_Get_JSESSIONID, service_5_UesrAccounts, service_11_TransactionsForAccount }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const { response, duration } = await service_11_TransactionsForAccount.getTransactionsForAccount(accountID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Transactions For Account Response', async () => {
            await service_11_TransactionsForAccount.verifyAPIResponseForAccountTransactions(response);
        });

        await test.step('Verify Transactions For Account', async () => {
            await service_11_TransactionsForAccount.verifyTransactionsForAccount(response);
        });
    });
}

