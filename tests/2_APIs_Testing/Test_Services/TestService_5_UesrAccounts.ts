import { test } from '../../Fixtures/fixtures';
import { Service_Base } from "../Services/01_Service_Base";


export const TestService_5_UesrAccounts = () => {
    test('Verify User Accounts', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_5_UesrAccounts.getUserAccounts(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await Service_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await Service_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API User Accounts Response', async () => {
            await service_5_UesrAccounts.verifyAPIUserAccountsResponse(response, userID);
        });

        await test.step('Verify Capture Account ID', async () => {
            await service_5_UesrAccounts.captureAccountID(response);
        })

        await test.step('Verify Capture Original Account Balance', async () => {
            await service_5_UesrAccounts.captureOrginalAccountBalance(response);
        })
    });
}
