import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class Service_5_UesrAccounts {
    private request: APIRequestContext;
    private accountIDPath = path.join(process.cwd(), 'AccountID.json');
    private originalAccountBalancePath = path.join(process.cwd(), 'OriginalAccountBalance.json');

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

    async captureOrginalAccountBalance(response: APIResponse) {
        try {
            const accounts = await response.json();
            const accountBalance = accounts[0].balance;
            const data = { accountBalance };
            fs.writeFileSync(this.originalAccountBalancePath, JSON.stringify(data, null, 2));
            console.log("Original Account Balance stored successfully: " + accountBalance);
        } catch (err) {
            console.error("Error storing Original Account Balance: " + err);
        }
    }

    async useOrginalAccountBalance() {
        try {
            if (fs.existsSync(this.originalAccountBalancePath)) {
                const data = JSON.parse(fs.readFileSync(this.originalAccountBalancePath, 'utf-8'));
                return String(data.accountBalance);
            }
            throw new Error(" Original Account Balance file does not exist.");
        } catch (err) {
            console.error("Error reading Original Account Balance: " + err);
            return "Error reading Original Account Balance";
        }
    }

        async captureAccountID(response: APIResponse) {
        try {
            const accounts = await response.json();
            const accountID = accounts[0].id;
            const data = { accountID };
            fs.writeFileSync(this.accountIDPath, JSON.stringify(data, null, 2));
            console.log("AccountID stored successfully: " + accountID);
        } catch (err) {
            console.error("Error storing AccountID: " + err);
        }
    }

    async useAccountID() {
        try {
            if (fs.existsSync(this.accountIDPath)) {
                const data = JSON.parse(fs.readFileSync(this.accountIDPath, 'utf-8'));
                return String(data.accountID);
            }
            throw new Error("AccountID file does not exist.");
        } catch (err) {
            console.error("Error reading AccountID: " + err);
            return "Error reading AccountID";
        }
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