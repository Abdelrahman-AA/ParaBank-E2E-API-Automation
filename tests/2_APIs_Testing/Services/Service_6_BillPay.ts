import { APIsEndpoints, TestDataInterfaces } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Service_6_BillPay {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    //Methods
    async postBillPay(accountID: string, payeeData: TestDataInterfaces.PayeeData, sessionID: string,) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const billPayload = {
            name: payeeData.name,
            address: {
                street: payeeData.addressStreet,
                city: payeeData.addressCity,
                state: payeeData.addressState,
                zipCode: payeeData.addressZipCode
            },
            phoneNumber: payeeData.phoneNumber,
            accountNumber: payeeData.accountNumber
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.BillPay_Endpoint(accountID, payeeData.amount), { headers: headers, data: billPayload });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

//Verifications
    async verifyAPIBillPayResponse(response: APIResponse,payeeName: string, accountID: string, amount: string) {
        const body = await response.json();


        expect(body.payeeName).toBeDefined();
        expect(String(body.payeeName)).toBe(payeeName);
 
        expect(body.amount).toBeDefined();
        expect(String(body.amount)).toBe(amount);

        expect(body.accountId).toBeDefined();
        expect(String(body.accountId)).toBe(accountID);
    }

    async verifyAccountBalanceAfterBillPay(response: APIResponse, OriginalBalance: string, billAmount: string) {
        const accounts = await response.json();
        const accountBalance = accounts[0].balance;
        expect(Number(accountBalance)).toBe(Number(OriginalBalance) - Number(billAmount));
    }
}