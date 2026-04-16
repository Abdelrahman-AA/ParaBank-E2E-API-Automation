import { test } from '../Fixtures/fixtures';
import { FinalizeTests_Base } from './FinalizeTests_Base';

export const FinalizeTests = () => {
    test('Delete Test Data', async () => {
        await test.step('Delete Account Transactions File', async () => {
            await FinalizeTests_Base.deleteTransactionsFile();
        });

        await test.step('Delete API-RunningTestData File', async () => {
            await FinalizeTests_Base.deleteAPIRunningTestData();
        });

        await test.step('Delete test-data File', async () => {
            await FinalizeTests_Base.deleteTestData();
        });

        await test.step('Delete test-data_Account File', async () => {
            await FinalizeTests_Base.deleteTestDataAccount();
        });

        await test.step('Delete test-data_Transation File', async () => {
            await FinalizeTests_Base.deleteTestDataTransaction();
        });
    });

}