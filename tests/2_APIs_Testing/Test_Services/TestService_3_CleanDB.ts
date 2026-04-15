import { test } from '../../Fixtures/fixtures';
import {Service_Base} from "../Services/01_Service_Base";

export const TestService_3_CleanDB = () => {
    test('Verify Clean DB',async ({ service_0_Get_JSESSIONID,service_3_CleanDB, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
         const { response, duration } = await service_3_CleanDB.postCleanDB(jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await Service_Base.virfyStatusCode(response,204);
        });

        await test.step('Verify Responding Time', async () => {
            await Service_Base.verifyResponseTime(duration);
        });

        await test.step('Verify DB Cleaned', async () => {
            await service_3_CleanDB.verifyCleanDB(testData.validUser.username, testData.validUser.password, jSESSIONID);
        });
    });
}
