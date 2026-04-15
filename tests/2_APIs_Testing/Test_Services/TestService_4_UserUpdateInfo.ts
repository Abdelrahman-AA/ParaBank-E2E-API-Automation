import { test } from '../../Fixtures/fixtures';
import { Service_Base } from "../Services/01_Service_Base";


export const TestService_4_UserUpdateInfo = () => {
    test('Verify User Info Update', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_4_UserUpdateInfo, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_4_UserUpdateInfo.postUpdateUserInfo(userID, testData.updateProfileData, testData.validUser, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await Service_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await Service_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Response', async () => {
            await service_4_UserUpdateInfo.verifyAPIResponseUpdateInfo(response);
        })

    });

    test('Verify User By ID After Update', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_3_UserByID, testData }) => {
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
            await service_3_UserByID.verifyAPIResponseAgainstExpectedResponseAfterUpdate(response, testData.updateProfileData);
        })
    });

}
