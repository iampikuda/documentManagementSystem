/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf.js');

module.exports = {
  'Edit Users Role': function (browser) {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .assert.title('Document Management System')
      .click('#login-btn')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[type=email]', 'oluwadamisi.pikuda@andela.com')
      .setValue('input[type=password]', 'unlock')
      .click('button[type="submit"]')
      .pause(5000)
      .waitForElementVisible('.search-box')
      .pause(1500)
      .assert.urlEquals('http://localhost:8000/dashboard')
      .useCss()
      .click('#userlist')
      .waitForElementVisible('#allUsersTable')
      .pause(1000)
      .assert.elementPresent('select#roleSelector')
      .end();
  }
};