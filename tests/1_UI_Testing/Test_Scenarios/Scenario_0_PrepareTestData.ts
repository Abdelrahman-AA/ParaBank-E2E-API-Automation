import { test } from '../../Fixtures/fixtures';
import { TestData, TestDataGenerator } from '../../Data/0_DataIndex';
import * as fs from 'fs';

export const scenario_0_PrepareTestData = () => {
    test.describe('Scenario 0: Prepare Test Data', () => {
        test('Setup: Initialize Test Data', async () => {
            const user = TestDataGenerator.getValidUser();
            const storeContent = {
                validUser: user,
                forgotLoginInfoData: TestDataGenerator.getForgotLoginInfo(user),
                payeeData: TestDataGenerator.getPayeeInfo(),
                updateProfileData: TestDataGenerator.getUpdateProfileInfo(),
                financeData: TestDataGenerator.getTransactionData()
            };

            fs.writeFileSync('./test-data.json', JSON.stringify(storeContent, null, 2));

            Object.assign(TestData, storeContent);

            console.log('>>> Global Test Data Initialized for User:', TestData.validUser.username);

            await test.step('Finish Scenario', async () => {
                console.log('Scenario 0 Finished: Global Test Data Initialized for User');
            });
        });


    });


}