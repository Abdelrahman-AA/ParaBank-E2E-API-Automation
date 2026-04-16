import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const RunningDataPath = path.join(process.cwd(), 'API-RunningTestData.json');


export class Service_13_TransactionsWithMonthAndType {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async getTransactionWithMonthAndType(userID: string, month: string, type: string, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.get(APIsEndpoints.TransactionsWithMonthAndType_Endpoint(userID, month, type), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

    // Verifications
    async verifyAPIResponseForTransactionWithMonthAndType(response: APIResponse,) {
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        expect(body[0].id).toBeDefined();
        expect(body[0].accountId).toBeDefined();
        expect(body[0].type).toBeDefined();
        expect(body[0].amount).toBeDefined();
        expect(body[0].description).toBeDefined();
    }
    async verifyTransactionsWithMonthAndType(response: APIResponse, accountId: string, amount: string) {
        const body = await response.json();
        const data = JSON.parse(fs.readFileSync(RunningDataPath, 'utf-8'));
        expect(body[0].id).toBe(data.depositTransactionID);
        expect(String(body[0].accountId)).toBe(accountId);
        expect(String(body[0].amount)).toBe(amount);
    }
}