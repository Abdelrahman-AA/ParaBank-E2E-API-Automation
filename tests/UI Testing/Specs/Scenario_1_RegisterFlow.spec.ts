import { test, expect } from '../Fixtures/fixtures';

test.describe('Scenario 1: Registration Flow', () => {
    
    test('Go to Register Page from Home page and Register a new user and Log out', async ({ homePage, registerPage, staticToolBarLinks }) => {
    await test.step('Go to Home Page', async () => {
        await homePage.goToHomePage();
        await homePage.homePageIsOpened();
    });

    await test.step('Go to Register Page from Home page', async () => {
        await homePage.clickOnRegister();
        await registerPage.registerPageIsOpened();
    });

    await test.step('Register a new user', async () => {
        await registerPage.register({
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            phoneNumber: '112345679',
            ssn: '123-45-6789',
            username: 'john_doe_1023',
            password: 'Password@123',
            passwordConfirmation: 'Password@123'
        });

        await registerPage.registrationSuccessMessageIsDisplayed('john_doe_1023');
    });

    await test.step('Log out from the successfully registered page', async () => {
        await staticToolBarLinks.logout();
        await homePage.homePageIsOpened(); 
    });

    });
});