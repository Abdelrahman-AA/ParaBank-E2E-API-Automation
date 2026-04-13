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
    runTest.Scenario_9_SearchTransactionsById();
    runTest.Scenario_10_SearchTransactionsByTransactionDate();
    runTest.Scenario_11_SearchTransactionsByDateRange();
    runTest.Scenario_12_SearchTransactionsByTransactionAmount();
    runTest.Scenario_13_RequestLoanAndVerifyApproval();
    runTest.Scenario_14_PagesPublicAccessCheckURLs();
    runTest.Scenario_15_PagesPrivateAccessCheckURLs();
    runTest.Scenario_16_NavigatePagesFromSstaticToolBar();

});