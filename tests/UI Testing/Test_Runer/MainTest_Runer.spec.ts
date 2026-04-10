import { test } from '../Fixtures/fixtures';

import * as runTest from '../Test_Scenarios/0_ScenariosIndex';

test.describe('Main Test Runner for ParaBank UI Testing (Execute all test scenarios sequentially)', () => {

    runTest.scenario_1_RegistrationFlow();
    runTest.scenario_2_LoginFlow();
    runTest.scenario_3_RetrieveLoginInfo();
    runTest.scenario_4_UpdateUserInfo();

});