import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Service_9_CreateAccount {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Methods
    async postCreateAccount(userID: string, accountID: string, accountType: number, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.CreateAccount_Endpoint(userID, accountType, accountID), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

    //Verification
    async verifyAPICreateAccountResponse(response: APIResponse, userID: string, accountType: number) {
        const body = await response.json();
        expect(body.id).toBeDefined();
        expect(body.customerId).toBeDefined();
        expect(String(body.customerId)).toBe(userID);
        expect(body.type).toBeDefined();
        if (accountType == 0) {
            expect(String(body.type)).toBe("CHECKING");
        } else if (accountType == 1) {
            expect(String(body.type)).toBe("SAVINGS");
        } else if (accountType == 2) {
            expect(String(body.type)).toBe("LOAN");
        }
        expect(body.balance).toBeDefined();
        expect(Number(body.balance)).toBe(0);
    }

    async verifyAccountIsCreated(response: APIResponse, accountType: number, userID: string) {
        const body = await response.json();
        expect(body.length).toBeGreaterThan(1);
        if (accountType == 0) {
            expect(body[1].id).toBeDefined();
            expect(String(body[1].customerId)).toBe(userID);
            expect(body[1].type).toBeDefined();
            expect(String(body[1].type)).toBe("CHECKING");
            expect(body[1].balance).toBeDefined();
        }
        if (accountType == 1) {
            expect(body[2].id).toBeDefined();
            expect(String(body[2].customerId)).toBe(userID);
            expect(body[2].type).toBeDefined();
            expect(String(body[2].type)).toBe("SAVINGS");
            expect(body[2].balance).toBeDefined();
        }
        if (accountType == 2) {
            expect(body[3].id).toBeDefined();
            expect(String(body[3].customerId)).toBe(userID);
            expect(body[3].type).toBeDefined();
            expect(String(body[3].type)).toBe("LOAN");
            expect(body[3].balance).toBeDefined();
        }
    }
}