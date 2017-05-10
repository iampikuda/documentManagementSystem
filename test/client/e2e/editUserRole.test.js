// const config = require('../../../../nightwatch.conf.js');

// module.exports = {
//   'Edit Users Role': function (browser) {
//     browser
//       .url('http://localhost:5050/app/')
//       .waitForElementVisible('body')
//       .assert.title('Document Management System')
//       .click('a.login-btn')
//       .setValue('input[type=text]', 'Lolita')
//       .setValue('input[type=password]', 'triger')
//       .click('button[type="submit"]')
//       .waitForElementVisible('div.center')
//       .assert.containsText('div.center', 'Login Successful')
//       .pause(1500)
//       .assert.urlEquals('http://localhost:5050/app/dashboard')
//       .click('a.allUsers-btn')
//       .waitForElementVisible('table#allUsersTable')
//       .pause(1000)
//       .assert.elementPresent('select[id="selectRole"]')
//       .end();
//   }
// };