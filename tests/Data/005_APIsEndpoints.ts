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

    CreateAccount_LOAN_Endpoint: (
        userID: string,
        accountType: number,
        accountID: string,
    ) => `https://parabank.parasoft.com/parabank/services/bank/createAccount?customerId=${userID}&newAccountType=${accountType}&fromAccountId=${accountID}`,
   
    CleanDB_Endpoint: "https://parabank.parasoft.com/parabank/services/bank/cleanDB",
} as const;