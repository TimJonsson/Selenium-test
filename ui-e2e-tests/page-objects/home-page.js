const {By} = require('selenium-webdriver');
let BasePage = require('./base-page.js');
let webdriver = require('selenium-webdriver');

class HomePage extends BasePage {

    constructor(driver) {
        super(driver);
        this.signInButton = By.className('MuiButton-root');
    }

    async clickSignInButton() {
        await this.driver.findElement(this.signInButton).click()    }
}

module.exports = HomePage;