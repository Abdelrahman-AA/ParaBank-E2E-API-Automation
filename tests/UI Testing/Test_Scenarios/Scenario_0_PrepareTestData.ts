import { test } from '../Fixtures/fixtures';
import { TestData, TestDataGenerator } from '../Data/0_DataIndex';
// import * as fs from 'fs';

export const scenario_0_PrepareTestData = () => {
    test.describe('Scenario 0: Prepare Test Data', () => {
        test('Setup: Initialize Test Data', async () => {
            const user = TestDataGenerator.getValidUser(); 
            
            // TestData.validUser = user;
            // TestData.forgotLoginInfoData = TestDataGenerator.getForgotLoginInfo(user);
            // TestData.payeeData = TestDataGenerator.getPayeeInfo();
            // TestData.updateProfileData = TestDataGenerator.getUpdateProfileInfo();
            // TestData.financeData = TestDataGenerator.getTransactionData();
            fs.writeFileSync('./test-data.json', JSON.stringify(user));
            
            console.log('>>> Global Test Data Initialized for User:', TestData.validUser.username);
        });
    });
}