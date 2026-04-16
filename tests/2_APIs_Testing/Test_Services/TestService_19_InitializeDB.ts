import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

export const TestService_19_InitializeDB = () => {
    test('Verify Initialize DB', async ({ service_0_Get_JSESSIONID, service_19_InitializeDB, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const { response, duration } = await service_19_InitializeDB.postInitializeDB(jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response, 204);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });
    });
}
