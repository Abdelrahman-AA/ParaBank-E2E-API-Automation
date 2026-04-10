import { RegistrationData, ForgotLoginInfoData, PayeeData, UpdateProfileData, FinanceData } from './002_Interfaces';

export const validUser: RegistrationData = {
    firstName: 'Abdelrahman',
    lastName: 'Abodief',
    address: '90th',
    city: 'Cairo',
    state: 'Egypt',
    zipCode: '12345',
    phoneNumber: '01007464654',
    ssn: '123-45-6789',
    username: 'Abdelrahman_A',
    password: 'test@001a',
    passwordConfirmation: 'test@001a'
};

export const forgotLoginInfo: ForgotLoginInfoData = {
    firstName: 'Abdelrahman',
    lastName: 'Abodief',
    addressStreet: '90th',
    addressCity: 'Cairo',
    addressState: 'Egypt',
    addressZipCode: '12345',
    ssn: '123-45-6789'
};

export const payeeInfo: PayeeData = {
    name: 'Ahmed',
    addressStreet: '60th',
    addressCity: 'Cairo',
    addressState: 'Egypt',
    addressZipCode: '12345',
    phoneNumber: '01007464654',
    accountNumber: '123456789',
    verifyAccount: '123456789',
    amount: '100.00'
};

export const updateProfileInfo: UpdateProfileData = {
    firstName: 'A',
    lastName: 'A',
    address: '1th',
    city: 'Alex',
    state: 'Alex-Egypt',
    zipCode: '00000',
    phoneNumber: '010074646540'
}

export const transactionData: FinanceData = {
    amountToTransfer: '100.00',
    amountToBillPay: '100',
    loanAmount: '100',
    downPayment: '50'
};