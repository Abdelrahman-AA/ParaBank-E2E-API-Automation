import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { Service_Base } from "./01_Service_Base";

export class Service_10_TransferFunds {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async postTransferFunds(accountID: string,fromAccountID: string, toAccountID: string, amount: string, sessionID: string,expectedStatusCode: Number = 200) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.TransferFunds_Endpoint(fromAccountID, toAccountID, amount), { headers });
        const duration = performance.now() - startTime;
                if (response.status() === expectedStatusCode) {
                    await Service_Base.addOrignalAccountTransactions(accountID, 'Debit', amount, 'Funds Transfer Sent')
                }
        return { response, duration };
    }


    // Verifications
    async verifyAPIResponseTransferFunds(response: APIResponse, fromAccountID: string, toAccountID: string, amount: string) {
        const body = await response.text();
        expect(body).toBe(`Successfully transferred $${amount} from account #${fromAccountID} to account #${toAccountID}`);
    }


    async verifyAccountsBalanceAfterTransfer(response: APIResponse,beforeBalance: string, transferAmount: string,senderORReciver: string="Sender", accounOrder: number=0){
        const accounts = await response.json();
        const accountBalance = accounts[accounOrder].balance;
        if (senderORReciver === "Sender"){
        expect(Number(accountBalance)).toBe(Number(beforeBalance) - Number(transferAmount));}
        else if (senderORReciver === "Reciver"){
            expect(Number(accountBalance)).toBe(Number(beforeBalance) + Number(transferAmount));
        }
    }
}