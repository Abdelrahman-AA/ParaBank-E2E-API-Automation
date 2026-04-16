import { test } from '../../Fixtures/fixtures';
import {TestService_Base} from './01_TestServices_Base'

export const TestService_0_Get_JSESSIONID = () => {
    test('Get JSESSIONID',async ({ service_0_Get_JSESSIONID }) => {
         const { response, duration } = await service_0_Get_JSESSIONID.captureJSESSIONID();

        await test.step('verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

    });

}
