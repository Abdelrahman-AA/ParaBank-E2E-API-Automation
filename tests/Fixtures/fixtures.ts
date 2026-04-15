import { test as base, expect } from '@playwright/test';
import * as Pages from '../1_UI_Testing/Pages/0_PagesIndex';
import { TestData } from '../Data/0_DataIndex';

import * as services from '../2_APIs_Testing/Services/0_ServicesIndex';
import * as fs from 'fs';

type MyFixtures = {
    testData: typeof TestData;

    staticToolBarLinks: Pages.staticToolBarLinks;
    homePage: Pages.HomePage;
    registerPage: Pages.RegisterPage;
    forgotLoginInfoPage: Pages.ForgotLoginInfoPage;
    newAccountPage: Pages.NewAccountPage;
    accountsOverviewPage: Pages.AccountsOverviewPage;
    accountDetailsPage: Pages.AccountDetailsPage;
    transactionDetailsPage: Pages.TransactionDetailsPage;
    transferFundsPage: Pages.TransferFundsPage;
    billPayPage: Pages.BillPayPage;
    findTransactionsPage: Pages.FindTransactionsPage;
    updateProfilePage: Pages.UpdateProfilePage;
    requestLoanPage: Pages.RequestLoanPage;

    service_0_Get_JSESSIONID: services.Service_0_Get_JSESSIONID;
    service_1_RegisterNewUser: services.Service_1_RegisterNewUser;
    service_2_LoginUser: services.Service_2_LoginUser;
    service_3_UserByID: services.Service_3_UserByID;
    service_4_UserUpdateInfo: services.Service_4_UserUpdateInfo;
    service_3_CleanDB: services.Service_3_CleanDB;
    service_5_UesrAccounts: services.Service_5_UesrAccounts;
    service_6_BillPay: services.Service_6_BillPay;
    service_7_AccountDeposit: services.Service_7_AccountDeposit;
    service_8_AccountWithdraw: services.Service_8_AccountWithdraw;
    service_9_CreateAccount: services.Service_9_CreateAccount;


};

type MyWorkerFixtures = {
    dbCleaned: void;
};

export const test = base.extend<MyFixtures, MyWorkerFixtures>({

    dbCleaned: [async ({ playwright }, use, testInfo) => {
        const requestContext = await playwright.request.newContext();
        if (testInfo.workerIndex === 0) {
            console.log('--- Global DB Reset Started (Worker 0) ---');
            try {
                const cleanResponse = await requestContext.post('https://parabank.parasoft.com/parabank/services/bank/cleanDB');
                console.log(`--- 1. CleanDB Status: ${cleanResponse.status()} ---`);
                expect(cleanResponse.ok()).toBeTruthy();
                await new Promise(resolve => setTimeout(resolve, 500));
                const initResponse = await requestContext.post('https://parabank.parasoft.com/parabank/services/bank/initializeDB');
                console.log(`--- 2. InitializeDB Status: ${initResponse.status()} ---`);
                expect(initResponse.ok()).toBeTruthy();
                console.log('--- Database is Clean and Initialized! ---');
            } catch (error) {
                console.error('--- DB Reset Failed! ---', error);
            }
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await requestContext.dispose();
        await use();
    }, { scope: 'worker', auto: true }],


    testData: async ({ }, use) => {
        const filePath = './test-data.json';
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const savedData = JSON.parse(fileContent);
                Object.assign(TestData, savedData);
            } catch (error) {
                console.error('Error parsing test-data.json:', error);
            }
        }
        await use(TestData);
    },

    homePage: async ({ page }, use) => { await use(new Pages.HomePage(page)); },
    registerPage: async ({ page }, use) => { await use(new Pages.RegisterPage(page)); },
    forgotLoginInfoPage: async ({ page }, use) => { await use(new Pages.ForgotLoginInfoPage(page)); },
    newAccountPage: async ({ page }, use) => { await use(new Pages.NewAccountPage(page)); },
    accountsOverviewPage: async ({ page }, use) => { await use(new Pages.AccountsOverviewPage(page)); },
    accountDetailsPage: async ({ page }, use) => { await use(new Pages.AccountDetailsPage(page)); },
    transactionDetailsPage: async ({ page }, use) => { await use(new Pages.TransactionDetailsPage(page)); },
    transferFundsPage: async ({ page }, use) => { await use(new Pages.TransferFundsPage(page)); },
    billPayPage: async ({ page }, use) => { await use(new Pages.BillPayPage(page)); },
    findTransactionsPage: async ({ page }, use) => { await use(new Pages.FindTransactionsPage(page)); },
    updateProfilePage: async ({ page }, use) => { await use(new Pages.UpdateProfilePage(page)); },
    requestLoanPage: async ({ page }, use) => { await use(new Pages.RequestLoanPage(page)); },
    staticToolBarLinks: async ({ page }, use) => { await use(new Pages.staticToolBarLinks(page)); },


    service_0_Get_JSESSIONID: async ({ request }, use) => { await use(new services.Service_0_Get_JSESSIONID(request)); },
    service_1_RegisterNewUser: async ({ request }, use) => { await use(new services.Service_1_RegisterNewUser(request)); },
    service_2_LoginUser: async ({ request }, use) => { await use(new services.Service_2_LoginUser(request)); },
    service_3_UserByID: async ({ request }, use) => { await use(new services.Service_3_UserByID(request)); },
    service_4_UserUpdateInfo: async ({ request }, use) => { await use(new services.Service_4_UserUpdateInfo(request)); },
    service_3_CleanDB: async ({ request }, use) => { await use(new services.Service_3_CleanDB(request)); },
    service_5_UesrAccounts: async ({ request }, use) => { await use(new services.Service_5_UesrAccounts(request)); },
    service_6_BillPay: async ({ request }, use) => { await use(new services.Service_6_BillPay(request)); },
    service_7_AccountDeposit: async ({ request }, use) => { await use(new services.Service_7_AccountDeposit(request)); },
    service_8_AccountWithdraw: async ({ request }, use) => { await use(new services.Service_8_AccountWithdraw(request)); },
    service_9_CreateAccount: async ({ request }, use) => { await use(new services.Service_9_CreateAccount(request)); },
});

export { expect } from '@playwright/test';