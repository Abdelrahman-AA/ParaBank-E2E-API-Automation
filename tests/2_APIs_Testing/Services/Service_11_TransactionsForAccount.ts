import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const OrignalAccountTransactionsPath = path.join(process.cwd(), 'OrignalAccountTransactions.json');
const RunningDataPath = path.join(process.cwd(), 'API-RunningTestData.json');



export class Service_11_TransactionsForAccount {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async getTransactionsForAccount(userID: string, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.get(APIsEndpoints.TransactionsForAccount_Endpoint(userID), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

    // Verifications
    async verifyAPIResponseForAccountTransactions(response: APIResponse,) {
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        body.forEach((transaction: any) => {
            expect(transaction.id).toBeDefined();
            expect(transaction.accountId).toBeDefined();
            expect(transaction.type).toBeDefined();
            expect(transaction.amount).toBeDefined();
            expect(transaction.description).toBeDefined();
        });
    }

    async verifyTransactionsForAccount(response: APIResponse) {
        const apiBody = await response.json();
        const fileData = JSON.parse(fs.readFileSync(OrignalAccountTransactionsPath, 'utf-8'));
        apiBody.forEach((transaction: any, index: number) => {
            const expected = fileData[index];
            fileData[index] = { id: transaction.id, ...fileData[index] };
            expect(transaction.accountId.toString()).toBe(expected.accountId.toString());
            expect(transaction.type).toBe(expected.type);
            expect(transaction.description).toBe(expected.description);
            if (transaction.description === 'Deposit via Web Service') {
                const depositTransactionID = transaction.id;
                try {
                    let runningData = {};
                    if (fs.existsSync(RunningDataPath)) {
                        runningData = JSON.parse(fs.readFileSync(RunningDataPath, 'utf-8'));
                    }
                    runningData = { ...runningData, depositTransactionID: depositTransactionID };
                    fs.writeFileSync(RunningDataPath, JSON.stringify(runningData, null, 2));
                    console.log("depositTransactionID stored successfully: " + depositTransactionID);
                } catch (err) {
                    console.error("Error storing depositTransactionID: " + err);
                }
            }
            expect(Number(transaction.amount)).toBe(Number(expected.amount));
        });
        fs.writeFileSync(OrignalAccountTransactionsPath, JSON.stringify(fileData, null, 2));
    }
}