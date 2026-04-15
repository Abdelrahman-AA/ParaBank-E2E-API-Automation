import { APIsEndpoints, TestDataInterfaces } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Service_3_UserByID {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

//Methods
    async getUserByID(userID: string, sessionID: string) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.get(APIsEndpoints.UserByID_Endpoint(userID), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
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
        console.log("UserById Validation Passed");
    }

        async verifyAPIResponseAgainstExpectedResponseAfterUpdate(response: APIResponse, expectedData: TestDataInterfaces.UpdateProfileData) {
        const body = await response.json();
        expect(body.firstName, "First Name Mismatch").toBe(expectedData.firstName);
        expect(body.lastName, "Last Name Mismatch").toBe(expectedData.lastName);
        expect(body.address.street, "Street Mismatch").toBe(expectedData.address);
        expect(body.address.city, "City Mismatch").toBe(expectedData.city);
        expect(body.address.state, "State Mismatch").toBe(expectedData.state);
        expect(body.address.zipCode, "Zip Code Mismatch").toBe(expectedData.zipCode);
        expect(body.phoneNumber, "Phone Number Mismatch").toBe(expectedData.phoneNumber);
        console.log("UserById Validation Passed");
    }
}