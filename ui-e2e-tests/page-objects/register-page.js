const { By, until } = require('selenium-webdriver');
let BasePage = require('./base-page.js');

class RegisterPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.registerButton = By.css('a[href="/register"]');
        this.emailinput = By.id('mui-3');
        this.passwordInput = By.id('mui-4');
        this.repeatPasswordInput = By.id('mui-5');
        this.firstNameInput = By.id('mui-6');
        this.lastNameInput = By.id('mui-7');
        this.countrySelection = By.className('MuiSelect-select');
        this.companyInput = By.id('mui-8')
        this.registerButton3 = By.xpath('//button[contains(text(), "Register")]');
        this.snackBarElement = By.className('MuiAlert-message css-1w0ym84');
    }

    async clickRegisterButton() {
        await this.driver.findElement(this.registerButton).click()
    }
    async enterEmail(email) {
        await this.driver.findElement(this.emailinput).sendKeys(email)
    }
    async enterPassword(password) {
        await this.driver.findElement(this.passwordInput).sendKeys(password)
    }

    async enterRepeatPassword(password) {
        await this.driver.findElement(this.repeatPasswordInput).sendKeys(password)
    }

    async enterFirstName(firstName) {
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName)
    }

    async enterLastName(lastName) {
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName)
    }

    async chooseCountry() {
        await this.driver.findElement(this.countrySelection).click()
        const swedenListOption = await this.driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[@data-value="SE"]')), 20000);
        await new Promise(r => setTimeout(r, 2000));
        await swedenListOption.click();
    }

    async enterCompany(company) {
        await this.driver.findElement(this.companyInput).sendKeys(company)
    }

    async clickRegisterButton() {
        await this.driver.findElement(this.registerButton3).click();
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


module.exports = RegisterPage;