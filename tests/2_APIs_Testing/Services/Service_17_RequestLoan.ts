import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { Service_Base } from "./01_Service_Base";


export class Service_17_RequestLoan {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async postRequestLoan(userID: string, accountID: string, amount: string, downPayment: string, sessionID: string,expectedStatusCode: Number = 200) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.RequestLoan_Endpoint(userID, amount, downPayment, accountID), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

    Verifications
    async verifyAPIResponseForRequestLoan(response: APIResponse) {
        const body = await response.json();
        expect(body.responseDate).toBeDefined();
        expect(body.loanProviderName).toBeDefined();
        expect(body.approved).toBeDefined();
        expect(body.accountId).toBeDefined();
        expect(body.loanProviderName).toBe("Wealth Securities Dynamic Loans (WSDL)");
        expect(body.approved).toBe(true);
    }

    async verifyAccountBalanceAfterLoanRequest(response: APIResponse, beforelBalance: string, downPayment: string) {
        const accounts = await response.json();
        const accountBalance = accounts[0].balance;
        expect(Number(accountBalance)).toBe(Number(beforelBalance) - Number(downPayment));
    }
}