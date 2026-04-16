import { APIResponse, expect } from '@playwright/test';

export const TestService_Base = {

    async virfyStatusCode(response: APIResponse, expectedStatusCode: number = 200) {
        expect(response.status()).toBe(expectedStatusCode);
    },

    async verifyResponseTime(duration: number, maxRespondingTime: number = 1000) {
        expect(duration).toBeLessThan(maxRespondingTime);
    },

    getFormattedReverseDate(offset: number = 0): string {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        const [year, month, day] = date.toISOString().split('T')[0].split('-');
        return `${month}-${day}-${year}`;
    },
};