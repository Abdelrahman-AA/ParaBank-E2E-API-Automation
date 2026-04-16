import { test } from '../../Fixtures/fixtures';
import { TestService_Base } from './01_TestServices_Base'

const orderOfReciverAccount = 1;
let beforeSenderBalance: string;
let beforeReceiverBalance: string;


export const TestService_10_TransferFunds = () => {
    test('Verify Transfer Funds', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_10_TransferFunds, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const accountID = await service_5_UesrAccounts.useOrginalAccountID();
        beforeSenderBalance = await service_5_UesrAccounts.getAccountBalance(userID, jSESSIONID);
        beforeReceiverBalance = await service_5_UesrAccounts.getAccountBalance(userID, jSESSIONID, orderOfReciverAccount);
        const fromAccountID = await service_5_UesrAccounts.useOrginalAccountID();
        const toAccountID = await service_5_UesrAccounts.getAccountIDbyOrder(userID, orderOfReciverAccount, jSESSIONID);
        const { response, duration } = await service_10_TransferFunds.postTransferFunds(accountID, fromAccountID, toAccountID, testData.financeData.amountToTransfer, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API Transfer Funds Response', async () => {
            await service_10_TransferFunds.verifyAPIResponseTransferFunds(response, fromAccountID, toAccountID, testData.financeData.amountToTransfer);
        })
    });


    test('Verify Sender Account Balance After Transfer', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_10_TransferFunds, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_5_UesrAccounts.getUserAccounts(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API User Accounts Response', async () => {
            await service_5_UesrAccounts.verifyAPIUserAccountsResponse(response, userID);
        });

        await test.step('Verify Account Balance After Bill Pay', async () => {
            await service_10_TransferFunds.verifyAccountsBalanceAfterTransfer(response, beforeSenderBalance, testData.financeData.amountToTransfer,"Sender");
        })
    });


    test('Verify Receiver Account Balance After Transfer', async ({ service_0_Get_JSESSIONID, service_2_LoginUser, service_5_UesrAccounts, service_10_TransferFunds, testData }) => {
        const jSESSIONID = await service_0_Get_JSESSIONID.useJSESSIONID();
        const userID: string = await service_2_LoginUser.useUserID();
        const { response, duration } = await service_5_UesrAccounts.getUserAccounts(userID, jSESSIONID);

        await test.step('Verify Status Code', async () => {
            await TestService_Base.virfyStatusCode(response);
        });

        await test.step('Verify Responding Time', async () => {
            await TestService_Base.verifyResponseTime(duration);
        });

        await test.step('Verify API User Accounts Response', async () => {
            await service_5_UesrAccounts.verifyAPIUserAccountsResponse(response, userID);
        });

        await test.step('Verify Account Balance After Bill Pay', async () => {
            await service_10_TransferFunds.verifyAccountsBalanceAfterTransfer(response, beforeReceiverBalance, testData.financeData.amountToTransfer,"Reciver",orderOfReciverAccount)
        })
    });

}
