import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { Service_Base } from "./01_Service_Base";

export class Service_7_AccountDeposit {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async postAccountDeposit(accountID: string, depositAmount: string, sessionID: string, expectedStatusCode: Number = 200) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.AccountDeposit_Endpoint(accountID, depositAmount), { headers });
        const duration = performance.now() - startTime;
        if (response.status() === expectedStatusCode) {
            await Service_Base.addOrignalAccountTransactions(accountID, 'Credit', depositAmount, 'Deposit via Web Service')
        }
        return { response, duration };
    }

    // Verifications
    async verifyAPIResponseDeposit(response: APIResponse, depositAmount, accountID: string) {
        const body = await response.text();
        expect(body).toBe(`Successfully deposited $${depositAmount} to account #${accountID}`);
    }

    async verifyAccountBalanceAfterDiposit(response: APIResponse, beforeBalance: string, depositAmount: string) {
        const accounts = await response.json();
        const accountBalance = accounts[0].balance;
        expect(Number(accountBalance)).toBe(Number(beforeBalance) + Number(depositAmount));
    }
}