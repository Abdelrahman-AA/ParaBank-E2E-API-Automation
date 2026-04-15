import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';



export class Service_0_Get_JSESSIONID {
    private request: APIRequestContext;
    private JSESSIONIDPath = path.join(process.cwd(), 'JSESSIONID.json');

    constructor(request: APIRequestContext) {
        this.request = request;
    }


    //Methods
    async captureJSESSIONID() {
        const startTime = performance.now();
        const response = await this.request.get(APIsEndpoints.RegisterHtmURL);
        const duration = performance.now() - startTime;
        const cookieHeader = response.headers()['set-cookie'];
        if (cookieHeader) {
            const match = cookieHeader.match(/JSESSIONID=([^;]+)/i);
            if (match) {
                try {
                    const data = { JSESSIONID: match[1] };
                    fs.writeFileSync(this.JSESSIONIDPath, JSON.stringify(data, null, 2));
                    console.log("JSESSIONID stored successfully: " + match[1]);
                } catch (err) {
                    console.error("Error storing JSESSIONID: " + err);
                }
            } else {
                console.warn("JSESSIONID not found in Set-Cookie header.");
            }
        } else {
            console.warn("No Set-Cookie header found in the response.");
        }
        return { response, duration };
    }

    async useJSESSIONID() {
        try {
            if (fs.existsSync(this.JSESSIONIDPath)) {
                const data = JSON.parse(fs.readFileSync(this.JSESSIONIDPath, 'utf-8'));
                return data.JSESSIONID;
            }
            throw new Error("JSESSIONID file does not exist.");
        } catch (err) {
            console.error("Error reading JSESSIONID: " + err);
            return null;
        }
    }
}