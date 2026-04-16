import { test } from '../../Fixtures/fixtures';
import {TestService_Base} from './01_TestServices_Base'

const accountCHEQUINGType = 0
const accountSAVINGSType = 1
const accountLOANType = 2

export const TestService_9_CreateAccount = () => {
    test('Verify Create CHEQUING Account', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_9_CreateAccount }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const { response, duration } = await service_9_CreateAccount.postCreateAccount(userID, accountID, accountCHEQUINGType, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Create Account Response', async () => {
            await service_9_CreateAccount.verifyAPICreateAccountResponse(response, userID, accountCHEQUINGType);
        });
    });

    test('Verify CHEQUING Account Is Created', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_9_CreateAccount }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_5_UesrAccounts.getUserAccounts(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify CHEQUING Account Is Created', async () => {
            await service_9_CreateAccount.verifyAccountIsCreated(response, accountCHEQUINGType, userID);
        });
    });


    test('Verify Create SAVINGS Account', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_9_CreateAccount }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const { response, duration } = await service_9_CreateAccount.postCreateAccount(userID, accountID, accountSAVINGSType, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Create Account Response', async () => {
            await service_9_CreateAccount.verifyAPICreateAccountResponse(response, userID, accountSAVINGSType);
        });
    });


           test('Verify SAVINGS Account Is Created', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_9_CreateAccount }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_5_UesrAccounts.getUserAccounts(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

            await test.step('Verify SAVINGS Account Is Created', async () => {
            await service_9_CreateAccount.verifyAccountIsCreated(response, accountSAVINGSType,userID);
        }); 
    });


        test('Verify Create LOAN Account', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_9_CreateAccount }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        const { response, duration } = await service_9_CreateAccount.postCreateAccount(userID, accountID, accountLOANType, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Create Account Response', async () => {
            await service_9_CreateAccount.verifyAPICreateAccountResponse(response, userID, accountLOANType);
        });
    });


           test('Verify LOAN Account Is Created', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_9_CreateAccount }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_5_UesrAccounts.getUserAccounts(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

            await test.step('Verify LOAN Account Is Created', async () => {
            await service_9_CreateAccount.verifyAccountIsCreated(response, accountLOANType,userID);
        }); 
    });
}
