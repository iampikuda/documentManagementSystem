const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('User', [
      {
        id: 1,
        firstName: 'Oluwadamisi',
        lastName: 'Pikuda',
        email: 'oluwadamisi.pikuda@andela.com',
        password: bcrypt.hashSync('unlock'),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: 'Kez',
        lastName: 'Crewda',
        email: 'kez@awesome.ness',
        password: bcrypt.hashSync('unlock'),
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
    return queryInterface.bulkDelete('User',
    { id: [1, 2] }, { returning: true });
  }
};
