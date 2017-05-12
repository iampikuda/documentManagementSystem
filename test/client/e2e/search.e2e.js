// /* eslint func-names: "off"*/
// /* eslint no-unused-vars: "off"*/
// const config = require('../../../nightwatch.conf.js');

// module.exports = {
//   'Search users': function (browser) {
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
//       .waitForElementVisible('body')
//       .assert.elementPresent('input')
//       .setValue('input#searchInput', 'pik')
//       .click('select[id="database"] option[value="users"]')
//       .keys(browser.Keys.RETURN)
//       .assert.elementPresent('table#userSearch')
//       .waitForElementVisible('table#userSearch')
//       .assert.elementPresent('table#userSearch tr:first-of-type>td')
//       .assert.containsText('table#userSearch tr:first-of-type>td', 'Oluwadamisi')
//       .end();
//     },
//     'Search documents': function (browser) {
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
//       .waitForElementVisible('body')
//       .assert.elementPresent('input')
//       .setValue('input#searchInput', 'pik')
//       .click('select[id="database"] option[value="documents"]')
//       .keys(browser.Keys.RETURN)
//       .assert.elementPresent('table#docSearch')
//       .waitForElementVisible('table#docSearch')
//       .assert.elementPresent('table#docSearch tr:first-of-type>th')
//       .assert.containsText('table#docSearch tr:first-of-type>th', 'Title')
//       .end();
//     }
//   }