import { APIsEndpoints } from "../../Data/0_DataIndex";
import { APIRequestContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';



export class Service_0_Get_JSESSIONID {
    private request: APIRequestContext;
    private RunningDataPath = path.join(process.cwd(), 'API-RunningTestData.json');

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
                    const sessionId = match[1];
                    let runningData = {};
                    if (fs.existsSync(this.RunningDataPath)) {
                        const fileContent = fs.readFileSync(this.RunningDataPath, 'utf-8');
                        runningData = JSON.parse(fileContent);
                    }
                    runningData = { ...runningData, JSESSIONID: sessionId };
                    fs.writeFileSync(this.RunningDataPath, JSON.stringify(runningData, null, 2));
                    console.log("JSESSIONID stored in API-RunningTestData: " + sessionId);
                } catch (err) {
                    console.error("Error storing data: " + err);
                }
            }
            return { response, duration };
        }
    }

    async useJSESSIONID() {
        try {
            if (fs.existsSync(this.RunningDataPath)) {
                const data = JSON.parse(fs.readFileSync(this.RunningDataPath, 'utf-8'));
                if (data.JSESSIONID) {
                    return data.JSESSIONID;
                }
                throw new Error("JSESSIONID not found in the running data file.");
            }
            throw new Error("Running data file does not exist.");
        } catch (err) {
            console.error("Error reading JSESSIONID: " + err);
            return null;
        }
    }
}