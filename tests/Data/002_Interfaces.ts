export interface RegistrationData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    ssn: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface ForgotLoginInfoData {
    firstName: string;
    lastName: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressZipCode: string;
    ssn: string;
}

export interface PayeeData {
    name: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressZipCode: string;
    phoneNumber: string;
    accountNumber: string;
    verifyAccount: string;
    amount: string;
}

    export interface UpdateProfileData {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        phoneNumber: string;
    }

export interface FinanceData {
    amountToTransfer: string;
    amountToBillPay: string;
    loanAmount: string;
    downPayment: string;
    depositAmount: string;
    withdrawAmount: string;
}