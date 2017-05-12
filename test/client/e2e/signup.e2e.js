/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf.js');

module.exports = {
  'SignUp Page': function (browser) {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body')
      .assert.title('Document Management System')
      .setValue('input#firstName', 'Kezman')
      .setValue('input#lastName', 'Pitcrewda')
      .setValue('input#email', 'many@gmail.com')
      .setValue('input#password', '123456')
      .setValue('input#confirmPassword', '123456')
      .click('button[type="submit"]')
      .pause(8000)
      .waitForElementVisible('.search-box')
      .assert.urlEquals('http://localhost:8000/dashboard')
      .waitForElementVisible('body')
      .end();
  }
};