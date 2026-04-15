import { APIsEndpoints, TestDataInterfaces } from "../../Data/0_DataIndex";
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Service_1_RegisterNewUser {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    //Methods
    async postRegisterNewUser(registrationData: TestDataInterfaces.RegistrationData, sessionID: string) {
        const headers = sessionID ? { 'Cookie': `JSESSIONID=${sessionID}` } : {};
        const startTime = performance.now();
        const response = await this.request.post(APIsEndpoints.RegisterHtmURL, {
            headers,
form: {
            "customer.firstName": registrationData.firstName,
            "customer.lastName": registrationData.lastName,
            "customer.address.street": registrationData.address,
            "customer.address.city": registrationData.city,
            "customer.address.state": registrationData.state,
            "customer.address.zipCode": registrationData.zipCode,
            "customer.phoneNumber": registrationData.phoneNumber,
            "customer.ssn": registrationData.ssn,
            "customer.username": registrationData.username,
            "customer.password": registrationData.password,
            "repeatedPassword": registrationData.passwordConfirmation
        }
        });
        const duration = performance.now() - startTime;
        return { response, duration };
    }

// Verifications
    async virifyUserCreation(response: APIResponse, firstName: string) {
        const body = await response.text();
        expect(body).toContain(firstName);
    }
}