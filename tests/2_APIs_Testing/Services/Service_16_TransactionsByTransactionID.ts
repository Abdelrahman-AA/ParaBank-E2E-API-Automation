import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const RunningDataPath = path.join(process.cwd(), 'API-RunningTestData.json');


export class Service_16_TransactionByTransactionID {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async getTransactionByTransactionID(transactionID: string, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.get(APIsEndpoints.TransactionsByTransactionID_Endpoint(transactionID), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

    async getStoredTransactionID() {
        const data = await JSON.parse(fs.readFileSync(RunningDataPath, 'utf-8'));
        return String(data.depositTransactionID);
    }

    // Verifications
    async verifyAPIResponseByTransactionID(response: APIResponse,) {
        const body = await response.json();
        expect(body.id).toBeDefined();
        expect(body.accountId).toBeDefined();
        expect(body.type).toBeDefined();
        expect(body.amount).toBeDefined();
        expect(body.description).toBeDefined();
    }


    async verifyTransactionByTransactionID(response: APIResponse, accountId: string, amount: string) {
        const body = await response.json();
        const data = JSON.parse(fs.readFileSync(RunningDataPath, 'utf-8'));
        expect(body.id).toBe(data.depositTransactionID);
        expect(String(body.accountId)).toBe(accountId);
        expect(String(body.amount)).toBe(amount);
    }
}