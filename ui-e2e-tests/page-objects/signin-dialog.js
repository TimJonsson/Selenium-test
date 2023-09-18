const {Builder, By, Key, until} = require('selenium-webdriver');
let BasePage = require('./base-page.js');

class SigninDialog extends BasePage {
    constructor(driver) {
        super(driver);
        this.registerButton = By.css('a[href="/register"]');
        this.emailInput = By.id('mui-1');    
        this.passwordButton = By.id('mui-2');
        this.signInCtaButton = By.xpath('//*[@id="root"]/div/header/div[2]/div/div/div[2]/form/div/div[3]/button');
        this.snackbar = By.className('MuiAlert-message css-1w0ym84');
        this.forgotPasswordButton = By.css('a[href="/forgot-password"]');
        this.snackBarElement = By.className('MuiAlert-filled css-1t1ofru');
        this.invalidCredentialsText = By.className('MuiAlert-message css-1w0ym84');

    }

    async clickRegisterButton() {
        await this.driver.findElement(this.registerButton).click()    
    }

    async enterEmail(email) {  
        await this.driver.findElement(this.emailInput).sendKeys(email)
    }

    async enterPassword(password) {
        await this.driver.findElement(this.passwordButton).sendKeys(password)
    }

    async clickSignInCtaButton() {
        await this.driver.findElement(this.signInCtaButton).click()    
    }

    async getSnackBarText() {
        let element = await this.driver.wait(
            until.elementLocated(this.snackBarElement),
            20000
        );
        let text = await element.getAttribute("innerText");
        return text;
    }

    async clickForgotPasswordButton() {
        await this.driver.findElement(this.forgotPasswordButton).click()
    }

    async getInvalidCredentialsText() {
        let element = await this.driver.wait(
            until.elementLocated(this.invalidCredentialsText),
            20000
        );
        let text = await element.getAttribute("innerText");
        return text;
    }
}

module.exports = SigninDialog;