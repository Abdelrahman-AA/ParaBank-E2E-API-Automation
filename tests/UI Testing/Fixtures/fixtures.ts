import { test as base } from '@playwright/test';

import * as Pages from '../Pages/0_PagesIndex';

type MyFixtures = {
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
};

export const test = base.extend<MyFixtures>({
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
});

export { expect } from '@playwright/test';