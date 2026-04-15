import { test } from '../../Fixtures/fixtures';
import {Service_Base} from "../Services/01_Service_Base";


export const TestService_1_RegisterNewUser = () => {
    test('Verify Register New User',async ({ service_0_Get_JSESSIONID,service_1_RegisterNewUser, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
         const { response, duration } = await service_1_RegisterNewUser.postRegisterNewUser(testData.validUser, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await Service_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await Service_Base.verifyResponseTime(duration);
        });

        await test.step('Verify User Creation', async () => {
            await service_1_RegisterNewUser.virifyUserCreation(response, testData.validUser.firstName);
        });
    });
}