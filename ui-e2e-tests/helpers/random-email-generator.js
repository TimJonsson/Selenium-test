class RandomEmailGenerator {
    constructor() {
      this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    }
  
    generateRandomEmail() {
      let email = '';
  
      // Generate a random string of 6 characters
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * this.alphabet.length);
        email += this.alphabet.charAt(randomIndex);
      }
  
      // Append "@gmail.com"
      email += '@gmail.com';
  
      return email;
    }
  }

module.exports = RandomEmailGenerator;
  