import { test } from '../Fixtures/fixtures';

import * as runTest from '../Test_Scenarios/0_ScenariosIndex';

test.describe('UI Testing (Execute all test scenarios sequentially)', () => {

    runTest.scenario_0_PrepareTestData();
    runTest.scenario_1_RegistrationFlow();
    runTest.scenario_2_LoginFlow();
    runTest.scenario_3_RetrieveLoginInfo();
    runTest.scenario_4_UpdateUserInfo();
    runTest.scenario_5_OpenNewCHECKINGaccount();
    // runTest.scenario_6_OpenNewSAVINGSaccount();
    // runTest.scenario_7_BillPaymentProcess();
    // runTest.scenario_8_TransferAmount();

});