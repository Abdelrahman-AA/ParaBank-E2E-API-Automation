import { request } from 'node:http';
import { test } from '../Fixtures/fixtures';

import * as runUiTest from '../1_UI_Testing/Test_Scenarios/0_ScenariosIndex';

import * as runAPIsTest from '../2_APIs_Testing/Test_Services/0_Test_ServicesIndex';
import { ru } from '@faker-js/faker';


test.describe('UI Testing (Execute all test scenarios sequentially)', () => {
    runUiTest.scenario_0_PrepareTestData();
    runUiTest.scenario_1_RegistrationFlow();
    runUiTest.scenario_2_LoginFlow();
    runUiTest.scenario_3_RetrieveLoginInfo();
    runUiTest.scenario_4_UpdateUserInfo();
    runUiTest.scenario_5_OpenNewCHECKINGaccount();
    runUiTest.scenario_6_OpenNewSAVINGSaccount();
    runUiTest.scenario_7_BillPaymentProcess();
    runUiTest.scenario_8_TransferAmount();
    runUiTest.scenario_9_SearchTransactionsById();
    runUiTest.scenario_10_SearchTransactionsByTransactionDate();
    runUiTest.scenario_11_SearchTransactionsByDateRange();
    runUiTest.scenario_12_SearchTransactionsByTransactionAmount();
    runUiTest.scenario_13_RequestLoanAndVerifyApproval();
    runUiTest.scenario_14_PagesPublicAccessCheckURLs();
    runUiTest.scenario_15_PagesPrivateAccessCheckURLs();
    runUiTest.scenario_16_NavigatePagesFromSstaticToolBar();
});



test.describe('API Testing @api', () => {
    // runAPIsTest.TestService_3_CleanDB();
    runAPIsTest.TestService_0_Get_JSESSIONID();
    runAPIsTest.TestService_1_RegisterNewUser();
    runAPIsTest.TestService_2_LoginUser();
    runAPIsTest.TestService_3_UserByID();
    runAPIsTest.TestService_4_UserUpdateInfo();
    runAPIsTest.TestService_5_UesrAccounts();
    runAPIsTest.TestService_6_BillPay();
    runAPIsTest.TestService_7_AccountDeposit();
    runAPIsTest.TestService_8_AccountWithdraw();
    runAPIsTest.TestService_9_CreateAccount();
    // runAPIsTest.TestService_3_CleanDB();
});