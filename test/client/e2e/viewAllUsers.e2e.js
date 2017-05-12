// /* eslint func-names: "off"*/
// /* eslint no-unused-vars: "off"*/
// const config = require('../../../nightwatch.conf.js');

// module.exports = {
//   'View All Users': function (browser) {
//     browser
//       .url('http://localhost:8000')
//       .waitForElementVisible('body')
//       .click('#login-btn')
//       .assert.urlEquals('http://localhost:8000/login')
//       .setValue('input[type=email]', 'oluwadamisi.pikuda@andela.com')
//       .setValue('input[type=password]', 'unlock')
//       .click('button[type="submit"]')
//       .waitForElementVisible('.search-box')
//       .assert.urlEquals('http://localhost:8000/dashboard')
//       .click('a#userlist')
//       .waitForElementVisible('table#allUsersTable')
//       .end();
//   }
// };