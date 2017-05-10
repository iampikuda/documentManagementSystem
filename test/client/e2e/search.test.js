// const config = require('../../../../nightwatch.conf.js');

// module.exports = {
//   'Search users': function (browser) {
//     browser
//       .url('http://localhost:5050/app/')
//       .waitForElementVisible('body')
//       .click('a.login-btn')
//       .setValue('input[type=text]', 'kez')
//       .setValue('input[type=password]', 'kez')
//       .click('button[type="submit"]')
//       .waitForElementVisible('div.center')
//       .assert.containsText('div.center', 'Login Successful')
//       .pause(1500)
//       .assert.urlEquals('http://localhost:5050/app/dashboard')
//       .waitForElementVisible('body')
//       .assert.elementPresent('input')
//       .setValue('input#searchInput', 'muna')
//       .pause(1000)
//       .click('select[id="database"] option[value="documents"]')
//       .pause(1000)
//       .click('select[id="database"] option[value="users"]')
//       .keys(browser.Keys.RETURN)
//       .pause(1000)
//       .assert.elementPresent('table#userSearch')
//       .waitForElementVisible('table#userSearch')
//       .assert.elementPresent('table#userSearch tr:first-of-type>td')
//       .assert.containsText('table#userSearch tr:first-of-type>td', 'Muna')
//       .end();
//     },
//     'Search documents': function (browser) {
//     browser
//       .url('http://localhost:5050/app/')
//       .waitForElementVisible('body')
//       .click('a.login-btn')
//       .setValue('input[type=text]', 'kez')
//       .setValue('input[type=password]', 'kez')
//       .click('button[type="submit"]')
//       .waitForElementVisible('div.center')
//       .assert.containsText('div.center', 'Login Successful')
//       .pause(1500)
//       .assert.urlEquals('http://localhost:5050/app/dashboard')
//       .waitForElementVisible('body')
//       .assert.elementPresent('input')
//       .setValue('input#searchInput', 'title')
//       .pause(1000)
//       .click('select[id="database"] option[value="documents"]')
//       .keys(browser.Keys.RETURN)
//       .pause(1000)
//       .assert.elementPresent('table#documentSearch')
//       .waitForElementVisible('table#documentSearch')
//       .assert.elementPresent('table#documentSearch tr:first-of-type>td')
//       .assert.containsText('table#documentSearch tr:first-of-type>td', 'title')
//       .end();
//     }
//   }