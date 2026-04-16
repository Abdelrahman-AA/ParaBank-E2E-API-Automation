export const APIsEndpoints = {
    RegisterHtmURL: "https://parabank.parasoft.com/parabank/register.htm",

    Login_Endpoint: (
        username: string,
        password: string
    ) => `https://parabank.parasoft.com/parabank/services/bank/login/${username}/${password}`,

    UserByID_Endpoint: (
        userID: string
    ) => `https://parabank.parasoft.com/parabank/services/bank/customers/${userID}`,

    UserUpdateInfo_Endpoint: (
        userID: string,
        userFirstName: string,
        userLastName: string,
        userAddressStreet: string,
        userAddressCity: string,
        userAddressState: string,
        userAddressZipCode: string,
        userPhoneNumber: string,
        userSSN: string,
        userUsername: string,
        userPassword: string
    ) => `https://parabank.parasoft.com/parabank/services/bank/customers/update/${userID}?firstName=${userFirstName}&lastName=${userLastName}&street=${userAddressStreet}&city=${userAddressCity}&state=${userAddressState}&zipCode=${userAddressZipCode}&phoneNumber=${userPhoneNumber}&ssn=${userSSN}&username=${userUsername}&password=${userPassword}`,

    UserAccounts_Endpoint: (
        userID: string
    ) => `https://parabank.parasoft.com/parabank/services/bank/customers/${userID}/accounts`,

    BillPay_Endpoint: (
        accountId: string,
        amount: string
    ) => `https://parabank.parasoft.com/parabank/services/bank/billpay?accountId=${accountId}&amount=${amount}`,

    AccountDeposit_Endpoint: (
        accountId: string,
        amount: string
    ) => `https://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${accountId}&amount=${amount}`,

    AccountWithdraw_Endpoint: (
        accountId: string,
        amount: string
    ) => `https://parabank.parasoft.com/parabank/services/bank/withdraw?accountId=${accountId}&amount=${amount}`,

    CreateAccount_Endpoint: (
        userID: string,
        accountType: number,
        accountID: string,
    ) => `https://parabank.parasoft.com/parabank/services/bank/createAccount?customerId=${userID}&newAccountType=${accountType}&fromAccountId=${accountID}`,

    TransferFunds_Endpoint: (
        fromAccountID: string,
        toAccountID: string,
        amount: string
    ) =>`https://parabank.parasoft.com/parabank/services/bank/transfer?fromAccountId=${fromAccountID}&toAccountId=${toAccountID}&amount=${amount}`,

    TransactionsForAccount_Endpoint:(
        accountID: string
    )=>`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountID}/transactions`,
   
    TransactionsWithAmount_Endpoint:(
        accountID: string,
        amount: string
    )=>`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountID}/transactions/amount/${amount}`,

    TransactionsWithMonthAndType_Endpoint:(
        accountID: string,
        month: string,
        type: string
    )=>`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountID}/transactions/month/${month}/type/${type}`,

    TransactionsFromDateToDate_Endpoint:(
        accountID: string,
        fromDate: string,
        toDate: string
    )=>`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountID}/transactions/fromDate/${fromDate}/toDate/${toDate}`,

    TransactionsOnDate_Endpoint:(
        accountID: string,
        transactionDate: string
    )=>`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountID}/transactions/onDate/${transactionDate}`,

    TransactionsByTransactionID_Endpoint:(
        transactionID: string
    )=>`https://parabank.parasoft.com/parabank/services/bank/transactions/${transactionID}`,

    RequestLoan_Endpoint: (
        userID: string,
        amount: string,
        downPayment: string,
        fromAccountId: string
    )=>`https://parabank.parasoft.com/parabank/services/bank/requestLoan?customerId=${userID}&amount=${amount}&downPayment=${downPayment}&fromAccountId=${fromAccountId}`,

    InitializeDB_Endpoint: "https://parabank.parasoft.com/parabank/services/bank/initializeDB",

    CleanDB_Endpoint: "https://parabank.parasoft.com/parabank/services/bank/cleanDB",
} as const;