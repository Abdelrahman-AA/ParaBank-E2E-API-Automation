import { APIResponse, expect } from '@playwright/test';

export const Service_Base = {

    async virfyStatusCode(response: APIResponse, expectedStatusCode: number = 200) {
        expect(response.status()).toBe(expectedStatusCode);
    },

    async verifyResponseTime(duration: number, maxRespondingTime: number=1000) {
        expect(duration).toBeLessThan(maxRespondingTime);
    },
};