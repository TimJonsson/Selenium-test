const chai = require('chai');
const HomePage = require('../page-objects/home-page.js');
const SigninDialog = require('../page-objects/signin-dialog.js');
const ForgotPasswordPage = require('../page-objects/forgot-password-page.js');
const TestData = require('../helpers/test-data.js');
const BasePage = require('../page-objects/base-page.js');


describe('Simple Selenium WebDriver Test', function () {
  let url = 'https://developers.symphony.com/';
  let driver;
  let homePage;
  let signinDialog;
  let forgotPasswordPage
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

    it('Send recovery email for an existing account', async function () {
      homePage = new HomePage(driver);
      signinDialog = new SigninDialog(driver);
      forgotPasswordPage = new ForgotPasswordPage(driver);

      await homePage.navigateToUrl(url);
      await homePage.clickSignInButton();
      await signinDialog.clickForgotPasswordButton();
      await forgotPasswordPage.enterEmail(testData.nonExistingEmail);
      await forgotPasswordPage.clickSendLinkButton();
      let snackBarText = await forgotPasswordPage.getSnackBarText();
      console.log("snackBarText: " + snackBarText);
      chai.assert.equal(snackBarText, testData.sendRecoveryEmailConfirmationMessage);
    });
});