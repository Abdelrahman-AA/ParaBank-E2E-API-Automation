import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const RunningDataPath = path.join(process.cwd(), 'API-RunningTestData.json');


export class Service_14_TransactionsFromDateToDate {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async getTransactionFromDateToDate(userID: string, fromDate: string, toDate: string, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.get(APIsEndpoints.TransactionsFromDateToDate_Endpoint(userID, fromDate, toDate), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

    // Verifications
    async verifyAPIResponseForTransactionFromDateToDate(response: APIResponse,) {
        const body = await response.json();
        expect.soft(body.length).toBeGreaterThan(0);
        body.forEach((transaction: any) => {
            expect.soft(transaction.id).toBeDefined();
            expect.soft(transaction.accountId).toBeDefined();
            expect.soft(transaction.type).toBeDefined();
            expect.soft(transaction.amount).toBeDefined();
            expect.soft(transaction.description).toBeDefined();
        });
    }

    async verifyTransactionsFromDateToDate(response: APIResponse, accountId: string, amount: string) {
        const body = await response.json();
        const data = JSON.parse(fs.readFileSync(RunningDataPath, 'utf-8'));
        const targetTransaction = body.find((t: any) => t.id === data.depositTransactionID);
        expect.soft(targetTransaction).toBeDefined();
        expect.soft(String(targetTransaction.accountId)).toBe(accountId);
        expect.soft(String(targetTransaction.amount)).toBe(amount);
    }
}