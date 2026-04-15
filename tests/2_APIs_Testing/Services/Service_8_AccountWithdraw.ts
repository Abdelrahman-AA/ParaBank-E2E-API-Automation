import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Service_8_AccountWithdraw {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async postAccountWithdraw(accountID: string, withdrawAmount: string, sessionID: string,) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.AccountWithdraw_Endpoint(accountID, withdrawAmount), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

    // Verifications
    async verifyAPIResponseWithdraw(response: APIResponse, withdrawAmount, accountID: string) {
        const body = await response.text();
        expect(body).toBe(`Successfully withdrew $${withdrawAmount} from account #${accountID}`);
    }

    async verifyAccountBalanceAfterWithdraw(response: APIResponse, OriginalBalance: string, billAmount: string, depositAmount: string, withdrawAmount: string) {
        const accounts = await response.json();
        const accountBalance = accounts[0].balance;
        expect(Number(accountBalance)).toBe(Number(OriginalBalance) - Number(billAmount) + Number(depositAmount)- Number(withdrawAmount));
    }
}