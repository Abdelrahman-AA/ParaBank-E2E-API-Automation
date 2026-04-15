import { test } from '../../Fixtures/fixtures';
import { Service_Base } from "../Services/01_Service_Base";


export const TestService_3_UserByID = () => {
    test('Verify User By ID', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_3_UserByID, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_3_UserByID.getUserByID(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await Service_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await Service_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Response Against Expected Response', async () => {
            await service_3_UserByID.verifyAPIResponseAgainstExpectedResponse(response, testData.validUser);
        })
    });
}