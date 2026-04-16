import { test } from '../../Fixtures/fixtures';
import {TestService_Base} from './01_TestServices_Base'

export const TestService_2_LoginUser = () => {
    test('Verify Login User',async ({ service_0_Get_JSESSIONID,service_2_LoginUser, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
         const { response, duration } = await service_2_LoginUser.getLoginUser(testData.validUser.username, testData.validUser.password, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify Capture User ID', async () => {
            await service_2_LoginUser.captureUserID(response);
        });

        await test.step('Verify API Response Against Expected Response', async () => {
            await service_2_LoginUser.verifyAPIResponseAgainstExpectedResponse(response, testData.validUser);
        })
    });
}
