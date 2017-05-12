// /* eslint func-names: "off"*/
// /* eslint no-unused-vars: "off"*/
// const config = require('../../../nightwatch.conf.js');

// module.exports = {
//   'View My Documents': function (browser) {
//     browser
//       .url('http://localhost:8000')
//       .waitForElementVisible('body')
//       .click('#login-btn')
//       .assert.urlEquals('http://localhost:8000/login')
//       .setValue('input[type=email]', 'kez@awesome.ness')
//       .setValue('input[type=password]', 'unlock')
//       .click('button[type="submit"]')
//       .waitForElementVisible('.search-box')
//       .assert.urlEquals('http://localhost:8000/dashboard')
//       .click('a#userdoclist')
//       .waitForElementVisible('table#userdocs')
//       .pause(1000)
//       .end();
//   }
// };