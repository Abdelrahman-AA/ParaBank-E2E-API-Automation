import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const OrignalAccountTransactionsPath = path.join(process.cwd(), 'OrignalAccountTransactions.json');
const RunningDataPath = path.join(process.cwd(), 'API-RunningTestData.json');
const testDataPath = path.join(process.cwd(), 'test-data.json');
const testDataAccountIDPath = path.join(process.cwd(), 'testData_AccountID.json');
const testDataTransactionIDPath = path.join(process.cwd(), 'testData_TransactionID.json');

export const FinalizeTests_Base = {
    
    async deleteTransactionsFile() {
        try {
            if (fs.existsSync(OrignalAccountTransactionsPath)) {
                fs.unlinkSync(OrignalAccountTransactionsPath);
                console.log("OrignalAccountTransactions file deleted successfully.");
            }
        } catch (err) {
            console.error("Error deleting file: " + err);
        }
        expect.soft(fs.existsSync(OrignalAccountTransactionsPath)).toBe(false);
    },

    async deleteAPIRunningTestData() {
        try {
            if (fs.existsSync(RunningDataPath)) {
                fs.unlinkSync(RunningDataPath);
                console.log("API-RunningTestData file deleted successfully.");
            }
        } catch (err) {
            console.error("Error deleting file: " + err);
        }
        expect.soft(fs.existsSync(RunningDataPath)).toBe(false);
    },

    async deleteTestData() {
        try {
            if (fs.existsSync(testDataPath)) {
                fs.unlinkSync(testDataPath);
                console.log("test-data.json file deleted successfully.");
            }
        } catch (err) {
            console.error("Error deleting file: " + err);
        }
        expect.soft(fs.existsSync(testDataPath)).toBe(false);
    },

    async deleteTestDataAccount(){
        try {
            if (fs.existsSync(testDataAccountIDPath)) {
                fs.unlinkSync(testDataAccountIDPath);
                console.log("testData_AccountID.json file deleted successfully.");
            }
        } catch (err) {
            console.error("Error deleting file: " + err);
        }
        expect.soft(fs.existsSync(testDataAccountIDPath)).toBe(false);
    },

    async deleteTestDataTransaction(){
        try {
            if (fs.existsSync(testDataTransactionIDPath)) {
                fs.unlinkSync(testDataTransactionIDPath);
                console.log("testData_TransactionID.json file deleted successfully.");
            }
        } catch (err) {
            console.error("Error deleting file: " + err);
        }
        expect.soft(fs.existsSync(testDataTransactionIDPath)).toBe(false);
    },
}