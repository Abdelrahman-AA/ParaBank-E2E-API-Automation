import { APIsEndpoints, TestDataInterfaces } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class Service_2_LoginUser {
    private request: APIRequestContext;
    private RunningDataPath = path.join(process.cwd(), 'API-RunningTestData.json');

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    //Methods
    async getLoginUser(username: string, password: string, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.get(APIsEndpoints.Login_Endpoint(username, password), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

async captureUserID(response: APIResponse) {
    const body = await response.json();
    const userID = body.id;
    try {
        let runningData = {};
        if (fs.existsSync(this.RunningDataPath)) {
            runningData = JSON.parse(fs.readFileSync(this.RunningDataPath, 'utf-8'));
        }
        runningData = { ...runningData, userID: userID };
        fs.writeFileSync(this.RunningDataPath, JSON.stringify(runningData, null, 2));
        console.log("UserID stored successfully: " + userID);
    } catch (err) {
        console.error("Error storing UserID: " + err);
    }
}

async useUserID() {
    try {
        if (fs.existsSync(this.RunningDataPath)) {
            const data = JSON.parse(fs.readFileSync(this.RunningDataPath, 'utf-8'));
            if (data.userID) {
                return String(data.userID);
            }
            throw new Error("UserID not found in the running data file.");
        }
        throw new Error("Running data file does not exist.");
    } catch (err) {
        console.error("Error reading UserID: " + err);
        return "Error reading UserID";
    }
}

// Verifications
    async verifyAPIResponseAgainstExpectedResponse(response: APIResponse, expectedData: TestDataInterfaces.RegistrationData) {
        const body = await response.json();
        expect(body.firstName, "First Name Mismatch").toBe(expectedData.firstName);
        expect(body.lastName, "Last Name Mismatch").toBe(expectedData.lastName);
        expect(body.address.street, "Street Mismatch").toBe(expectedData.address);
        expect(body.address.city, "City Mismatch").toBe(expectedData.city);
        expect(body.address.state, "State Mismatch").toBe(expectedData.state);
        expect(body.address.zipCode, "Zip Code Mismatch").toBe(expectedData.zipCode);
        expect(body.phoneNumber, "Phone Number Mismatch").toBe(expectedData.phoneNumber);
        expect(body.ssn, "SSN Mismatch").toBe(expectedData.ssn);
        console.log("User Validation Passed");
    }
}