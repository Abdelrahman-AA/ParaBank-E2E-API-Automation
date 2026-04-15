import { APIsEndpoints, TestDataInterfaces } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Service_4_UserUpdateInfo {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

//Methods
    async postUpdateUserInfo(userID: string,updateProfileData: TestDataInterfaces.UpdateProfileData,registrationData: TestDataInterfaces.RegistrationData, sessionID: string,) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {})
        };
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.UserUpdateInfo_Endpoint(
            userID,
            updateProfileData.firstName,
            updateProfileData.lastName,
            updateProfileData.address,
            updateProfileData.city,
            updateProfileData.state,
            updateProfileData.zipCode,
            updateProfileData.phoneNumber,
            registrationData.ssn,
            registrationData.username,
            registrationData.password
        ), { headers });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

//Verifications
    async verifyAPIResponseUpdateInfo(response: APIResponse) {
        const body = await response.text();
        expect(body).toBe("Successfully updated customer profile");
    }
}