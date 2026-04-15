import { test } from '../../Fixtures/fixtures';
import {Service_Base} from "../Services/01_Service_Base";

export const TestService_0_Get_JSESSIONID = () => {
    test('Get JSESSIONID',async ({ service_0_Get_JSESSIONID }) => {
         const { response, duration } = await service_0_Get_JSESSIONID.captureJSESSIONID();

        await test.step('verify Status Code', async () => {
            await Service_Base.virfyStatusCode(response);
        });

        await test.step('verify Responding Time', async () => {
            await Service_Base.verifyResponseTime(duration);
        });

    });

}
