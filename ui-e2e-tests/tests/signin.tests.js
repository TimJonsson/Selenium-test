const chai = require('chai');
const HomePage = require('../page-objects/home-page.js');
const SigninDialog = require('../page-objects/signin-dialog.js');
const TestData = require('../helpers/test-data.js');
const BasePage = require('../page-objects/base-page.js');

describe('Simple Selenium WebDriver Test', function () {
  let url = 'https://developers.symphony.com/';
  let driver;
  let homePage;
  let signinDialog;
  let confirmationMessage;  
  let testData
  let basePage


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

  it('Succesfull signin' , async function () {
    homePage = new HomePage(driver);
    signinDialog = new SigninDialog(driver);
  
    await homePage.navigateToUrl(url);
    await homePage.clickSignInButton();
    await signinDialog.enterEmail(testData.alreadyExistingEmail);
    await signinDialog.enterPassword(testData.password);
    await signinDialog.clickSignInCtaButton();
    confirmationMessage = await signinDialog.getSnackBarText();
    console.log("confirmationMessage: " + confirmationMessage);
    chai.assert.equal(confirmationMessage, testData.loginConfirmationMessage);
  });
  
  it('Attempt to signin with invalid credentials', async function () {
      homePage = new HomePage(driver);
      signinDialog = new SigninDialog(driver);
    
      await homePage.navigateToUrl(url);
      await homePage.clickSignInButton();
      await signinDialog.enterEmail(testData.nonExistingEmail);
      await signinDialog.enterPassword(testData.password);
      await signinDialog.clickSignInCtaButton();
      confirmationMessage = await signinDialog.getInvalidCredentialsText();
      chai.assert.equal(confirmationMessage, testData.invalidCredentialsMessage);
  }); 
}); 