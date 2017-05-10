// const config = require('../../../../nightwatch.conf.js');

// module.exports = {
//   'View All Roles': function (browser) {
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
//       .click('a.allRoles-btn')
//       .waitForElementVisible('table#allRolesTable')
//       .pause(1000)
//       .end();
//   }
// };