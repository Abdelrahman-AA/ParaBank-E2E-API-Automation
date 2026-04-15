import { APIsEndpoints, TestDataInterfaces } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Service_3_CleanDB {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    //Methods
    async postCleanDB(sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.CleanDB_Endpoint, { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }


// Verifications
    async verifyCleanDB(LastLoginUserName: string, LastLoginPassword: string, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const loginResponse = await this.request.get(APIsEndpoints.Login_Endpoint(LastLoginUserName, LastLoginPassword), { headers });
        expect(loginResponse.status()).toBe(400);
        const body = await loginResponse.text();
        expect(body).toBe("Invalid username and/or password");
    }
}