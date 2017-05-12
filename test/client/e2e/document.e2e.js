/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const faker = require('faker');
const config = require('../../../nightwatch.conf.js');

module.exports = {
  'Create Document': function (browser) {
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
      .waitForElementVisible('body')
      .click('#create-doc')
      .waitForElementVisible('div#modalDoc')
      .assert.elementPresent('h4')
      .setValue('#doc-title', 'The Life of Pablo')
      .useCss()
      .click('select[id="docAccess"] option[value="public"]')
      .execute('tinyMCE.activeEditor.setContent("This is my new content!")')
      // .pause(9000)
      .click('#saveDoc')
      .assert.urlEquals('http://localhost:8000/dashboard')
      .assert.elementPresent('table')

      .waitForElementVisible('#allDocuments')
      // .pause(3000) 
      // .assert.containsText('#allDocuments tr:first-of-type>td.doc-title', 'The Life of Pablo')
      .end();
  },
  'Edit Document': function (browser) {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .click('#login-btn')
      .assert.urlEquals('http://localhost:8000/login')
      .setValue('input[type=email]', 'kez@awesome.ness')
      .setValue('input[type=password]', 'unlock')
      .click('button[type="submit"]')
      .pause(5000)
      .waitForElementVisible('.search-box')
      .assert.urlEquals('http://localhost:8000/dashboard')
      .click('#userdoclist')
      .click('table#userdocs tbody tr:first-of-type a.edit-btn')
      .waitForElementVisible('div#modalEdit')
      .pause(1000)
      .waitForElementVisible('div#createDocModal')
      .clearValue('input#title')
      .setValue('input#title', 'Kondo Title')
      .click('button[type="submit"]')
      .pause(1000)
      .click('a#done')
      .pause(1000)
      .assert.urlEquals(`http://localhost:8000/dashboard?title=Issa+One+More+Title&action=`)
      .assert.elementPresent('table')
      .assert.containsText('table#document-list tr:first-of-type>td.doc-title', 'Issa One More Title')
      .end();
  },
  'Delete Document': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'moncateyes@yahoo.com')
      .setValue('input[type=password]', '123456')
      .click('button[type="submit"]')
      .waitForElementVisible('div.login-feedback')
      .assert.containsText('div.login-feedback', 'Login Successful')
      .pause(1000)
      .click('table#document-list tbody tr:first-of-type i.edit-btn')
      .waitForElementVisible('body')
      .clearValue('input#title')
      .setValue('input#title', 'Chosen One')
      .click('button[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .waitForElementVisible('body')
      .click('table#document-list tbody tr:first-of-type i.delete-btn')
      .pause(500)
      .waitForElementVisible('button.confirm')
      .click('button.confirm')
      .expect.element('table#document-list tr:first-of-type>td.doc-title').text.to.not.equal('Chosen One');
    browser.end();
  }
};