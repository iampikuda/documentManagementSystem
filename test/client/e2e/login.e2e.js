/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf');

module.exports = {
  'PK-DMS': function (browser) {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .click('#login-btn')
      .assert.urlEquals('http://localhost:8000/login')
      .assert.title('Document Management System')
      .saveScreenshot('screenshots/pk-dms-login.png')
      .end();
  },

  'Login Users': function (browser) {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .click('#login-btn')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[type=email]', 'kez@awesome.ness')
      .setValue('input[type=password]', 'unlock')
      .click('button[type="submit"]')
      .waitForElementVisible('.search-box')
      .assert.urlEquals('http://localhost:8000/dashboard')
      .end();
  }
};