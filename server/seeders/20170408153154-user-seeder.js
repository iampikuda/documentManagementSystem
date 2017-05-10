const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

const password = process.env.PASSWORD || 'unlock';

module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('User', [
      {
        firstName: 'Oluwadamisi',
        lastName: 'Pikuda',
        email: 'oluwadamisi.pikuda@andela.com',
        password: bcrypt.hashSync(password),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Kez',
        lastName: 'Crewda',
        email: 'kez@awesome.ness',
        password: bcrypt.hashSync(password),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
      { returning: true, validate: true }
      );
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
  */
    return queryInterface.bulkDelete('User', null, {});
  }
};
