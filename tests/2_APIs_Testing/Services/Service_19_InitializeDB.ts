import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext, expect } from '@playwright/test';

export class Service_19_InitializeDB {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    //Methods
    async postInitializeDB(sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.InitializeDB_Endpoint, { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }
};