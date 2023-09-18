const { Builder } = require('selenium-webdriver');
const chai = require('chai');
const HomePage = require('../page-objects/home-page.js');
const SigninDialog = require('../page-objects/signin-dialog.js');
const RegisterPage = require('../page-objects/register-page.js');
const RandomEmailGenerator = require('../helpers/random-email-generator.js');
const TestData = require('../helpers/test-data.js');
const BasePage = require('../page-objects/base-page.js');
const { test } = require('mocha');

describe('Simple Selenium WebDriver Test', function () {
  let url = 'https://developers.symphony.com/';
  let driver;
  let homePage;
  let signinDialog;
  let registerPage;
  let popUpMessage;
  let testData;
  let basePage;

  before(async function () {
    testData = new TestData();
  });

  beforeEach(async function () {
    basePage = new BasePage();
    driver = await basePage.returnDriver(testData.browserName);
    driver.manage().setTimeouts({implicit: (10000)});
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Test signing up with already existing account', async function () {

    homePage = new HomePage(driver);
    signinDialog = new SigninDialog(driver);
    registerPage = new RegisterPage(driver);

    await homePage.navigateToUrl(url);
    await homePage.clickSignInButton();
    await signinDialog.clickRegisterButton();
    await registerPage.clickRegisterButton();
    await registerPage.enterEmail(testData.alreadyExistingEmail);
    await registerPage.enterPassword(testData.password);
    await registerPage.enterRepeatPassword(testData.password);
    await registerPage.enterFirstName(testData.firstName);
    await registerPage.enterLastName(testData.lastName);
    await registerPage.chooseCountry();
    await registerPage.enterCompany(testData.company);
    await registerPage.clickRegisterButton();
    popUpMessage = await registerPage.getSnackBarText();
    chai.assert.equal(popUpMessage, testData.accountAlreadyExistsMessage);
  });

  it('Test sign up on a new account ', async function () {

    homePage = new HomePage(driver);
    signinDialog = new SigninDialog(driver);
    registerPage = new RegisterPage(driver);
    const emailGenerator = new RandomEmailGenerator();
    const randomEmail = emailGenerator.generateRandomEmail();
    console.log("randomEmail: " + randomEmail);

    await homePage.navigateToUrl(url);
    await homePage.clickSignInButton();
    await signinDialog.clickRegisterButton();
    await registerPage.clickRegisterButton();
    await registerPage.enterEmail(randomEmail);
    await registerPage.enterPassword(testData.password);
    await registerPage.enterRepeatPassword(testData.password);
    await registerPage.enterFirstName(testData.firstName);
    await registerPage.enterLastName(testData.lastName);
    await registerPage.chooseCountry();
    await registerPage.enterCompany(testData.company);
    await registerPage.clickRegisterButton();
    popUpMessage = await registerPage.getSnackBarText();
    chai.assert.equal(popUpMessage, testData.regestrationConfirmationMessage);
  });
});
