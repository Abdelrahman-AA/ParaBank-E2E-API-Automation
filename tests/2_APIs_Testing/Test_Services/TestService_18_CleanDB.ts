import { test } from '../../Fixtures/fixtures';
import {TestService_Base} from './01_TestServices_Base'

export const TestService_18_CleanDB = () => {
    test('Verify Clean DB',async ({ service_0_Get_JSESSIONID,service_18_CleanDB, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
         const { response, duration } = await service_18_CleanDB.postCleanDB(jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response,204);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify DB Cleaned', async () => {
            await service_18_CleanDB.verifyCleanDB(testData.validUser.username, testData.validUser.password, jSESSIONID);
        });
    });
}
