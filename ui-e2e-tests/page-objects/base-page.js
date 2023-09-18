const chai = require('chai');
const { Builder } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async returnDriver(driverToBuild) {
        let driver = new Builder().forBrowser(driverToBuild).build();
        return driver;
    }

    async navigateToUrl(url) {
        await this.driver.get(url);
        await this.isOnUrl(url)
    }

    async getCurrentUrl() {
        return await this.driver.getCurrentUrl();
      }
    
    async isOnUrl(url) {
        const currentUrl = await this.getCurrentUrl();
        chai.assert.equal(currentUrl, url);
    }
}

module.exports = BasePage; 
