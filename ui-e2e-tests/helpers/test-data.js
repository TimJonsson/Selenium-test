class TestData {
  constructor() {
    this.nonExistingEmail = 'tim.test@gmail.com'
    this.alreadyExistingEmail = 'tim.jonssontim@gmail.com';
    this.password = 'test1234#F';
    this.firstName = 'Tim';
    this.lastName = 'Jonsson';
    this.company = 'Symphony';
    this.sendRecoveryEmailConfirmationMessage = 'Please check your email for instructions.';
    this.invalidCredentialsMessage = 'Invalid Credentials';
    this.regestrationConfirmationMessage = 'Registration successful. Please check your email for instructions.';
    this.accountAlreadyExistsMessage = 'Account already exists';
    this.loginConfirmationMessage = 'Login successful';
    this.browserName = process.env.BROWSER || 'chrome'; // Get the browser from an environment variable or a default value (e.g., Chrome)
  }
}

module.exports = TestData;
