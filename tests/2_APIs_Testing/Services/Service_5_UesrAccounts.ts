import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class Service_5_UesrAccounts {
    private request: APIRequestContext;
    private RunningDataPath = path.join(process.cwd(), 'API-RunningTestData.json');
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async getUserAccounts(userID: string, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.get(APIsEndpoints.UserAccounts_Endpoint(userID), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

    async getAccountBalance(userID: string, sessionID: string, accountOrder: number = 0) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const response = await this.request.get(APIsEndpoints.UserAccounts_Endpoint(userID), { headers });
        const accounts = await response.json();
        return accounts[accountOrder].balance;
    }

    async captureOrginalAccountBalance(response: APIResponse) {
        try {
            const accounts = await response.json();
            const accountBalance = accounts[0].balance;
            let runningData = {};
            if (fs.existsSync(this.RunningDataPath)) {
                const fileContent = fs.readFileSync(this.RunningDataPath, 'utf-8');
                runningData = JSON.parse(fileContent);
            }
            runningData = { ...runningData, accountBalance: accountBalance };
            fs.writeFileSync(this.RunningDataPath, JSON.stringify(runningData, null, 2));
            console.log("Original Account Balance stored successfully: " + accountBalance);
        } catch (err) {
            console.error("Error storing Original Account Balance: " + err);
        }
    }

    async useOrginalAccountBalance() {
        try {
            if (fs.existsSync(this.RunningDataPath)) {
                const data = JSON.parse(fs.readFileSync(this.RunningDataPath, 'utf-8'));
                if (data.accountBalance !== undefined) {
                    return String(data.accountBalance);
                }
                throw new Error("accountBalance not found in the running data file.");
            }
            throw new Error("Running data file does not exist.");
        } catch (err) {
            console.error("Error reading Original Account Balance: " + err);
            return "Error reading Original Account Balance";
        }
    }

    async captureOrginalAccountID(response: APIResponse) {
        try {
            const accounts = await response.json();
            const accountID = accounts[0].id;

            let runningData = {};
            if (fs.existsSync(this.RunningDataPath)) {
                runningData = JSON.parse(fs.readFileSync(this.RunningDataPath, 'utf-8'));
            }

            runningData = { ...runningData, accountID: accountID };
            fs.writeFileSync(this.RunningDataPath, JSON.stringify(runningData, null, 2));

            console.log("AccountID stored successfully: " + accountID);
        } catch (err) {
            console.error("Error storing AccountID: " + err);
        }
    }

    async useOrginalAccountID() {
        try {
            if (fs.existsSync(this.RunningDataPath)) {
                const data = JSON.parse(fs.readFileSync(this.RunningDataPath, 'utf-8'));
                if (data.accountID !== undefined) {
                    return String(data.accountID);
                }
                throw new Error("accountID not found in the running data file.");
            }
            throw new Error("Running data file does not exist.");
        } catch (err) {
            console.error("Error reading AccountID: " + err);
            return "Error reading AccountID";
        }
    }

    async getAccountIDbyOrder(userID: string, accounOrder: number, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const response = await this.request.get(APIsEndpoints.UserAccounts_Endpoint(userID), { headers });
        const body = await response.json();
        return String(body[accounOrder].id)
    }

    // Verifications
    async verifyAPIUserAccountsResponse(response: APIResponse, userID: string) {
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        expect(body[0].id).toBeDefined();
        expect(String(body[0].customerId)).toBe(userID);
        expect(body[0].type).toBeDefined();
        expect(body[0].balance).toBeDefined();
    }
}