import { faker } from '@faker-js/faker';
import { TestDataInterfaces } from './0_DataIndex';

    let _firstName:string;
    let _lastName:string;
    let _addressStreet:string;
    let _addressCity:string;
    let _addressState:string;
    let _addressZipCode:string;
    let _ssn:string;


const uniqueId = Date.now().toString().slice(-6);
const password = 'test@001a';

export const getValidUser = (): TestDataInterfaces.RegistrationData => {
    const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        ssn: `999-${faker.number.int({ min: 10, max: 99 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
        username: faker.internet.username(),
        password: password,
        passwordConfirmation: password
    };
    return user;
};

export const getForgotLoginInfo = (user: TestDataInterfaces.RegistrationData): TestDataInterfaces.ForgotLoginInfoData => ({
    firstName: user.firstName,
    lastName: user.lastName,
    addressStreet: user.address,
    addressCity: user.city,
    addressState: user.state,
    addressZipCode: user.zipCode,
    ssn: user.ssn,
});

export const getPayeeInfo=(): TestDataInterfaces.PayeeData => ({
    name: faker.person.firstName(),
    addressStreet: `${faker.number.int({ min: 10, max: 99 })}th Street`,
    addressCity: faker.location.city(),
    addressState: faker.location.state(),
    addressZipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    accountNumber: "acc",
    verifyAccount: "acc",
    amount: '100.00'
});

export const getUpdateProfileInfo=() : TestDataInterfaces.UpdateProfileData=> ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: `${faker.number.int({ min: 1, max: 99 })}th Street`,
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number()
});

export const getTransactionData=() : TestDataInterfaces.FinanceData => ({
    amountToTransfer: '100.00',
    amountToBillPay: '100',
    loanAmount: '100',
    downPayment: '50'
});