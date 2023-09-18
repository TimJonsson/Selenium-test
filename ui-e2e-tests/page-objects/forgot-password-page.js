const { By, until } = require('selenium-webdriver');
let BasePage = require('./base-page.js');

class ForgotPasswordPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.forgotPasswordButton = By.css('a[href="/forgot-password"]');
        this.emailInputField = By.css("input[name='email']")
        this.sendLinkButton = By.xpath('//*[@id="forgot-password-form"]/div/div[2]/button')
        this.snackBarElement = By.className('MuiAlert-message css-1w0ym84');
    }

    async clickForgotPasswordButton() {
        await driver.findElement(this.forgotPasswordButton).click()
    }

    async enterEmail(email) {
        await this.driver.findElement(this.emailInputField).sendKeys(email)
    }

    async clickSendLinkButton() {
        await this.driver.findElement(this.sendLinkButton).click()
    }

    async getSnackBarText() {
        let element = await this.driver.wait(
            until.elementLocated(this.snackBarElement),
            20000
        );
        let text = await element.getAttribute("innerText");
        return text;
    }
}

module.exports = ForgotPasswordPage;