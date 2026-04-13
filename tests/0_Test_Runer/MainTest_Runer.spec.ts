import { test } from '../1_UI Testing/Fixtures/fixtures';

import * as runTest from '../1_UI Testing/Test_Scenarios/0_ScenariosIndex';

test.describe('UI Testing (Execute all test scenarios sequentially)', () => {

    runTest.scenario_0_PrepareTestData();
    runTest.scenario_1_RegistrationFlow();
    runTest.scenario_2_LoginFlow();
    runTest.scenario_3_RetrieveLoginInfo();
    runTest.scenario_4_UpdateUserInfo();
    runTest.scenario_5_OpenNewCHECKINGaccount();
    runTest.scenario_6_OpenNewSAVINGSaccount();
    runTest.scenario_7_BillPaymentProcess();
    runTest.scenario_8_TransferAmount();
    runTest.scenario_9_SearchTransactionsById();
    runTest.scenario_10_SearchTransactionsByTransactionDate();
    runTest.scenario_11_SearchTransactionsByDateRange();
    runTest.scenario_12_SearchTransactionsByTransactionAmount();
    runTest.scenario_13_RequestLoanAndVerifyApproval();
    runTest.scenario_14_PagesPublicAccessCheckURLs();
    runTest.scenario_15_PagesPrivateAccessCheckURLs();
    runTest.scenario_16_NavigatePagesFromSstaticToolBar();

});