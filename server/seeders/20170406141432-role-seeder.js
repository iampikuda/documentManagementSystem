module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('Role', [
      {
        id: 1,
        title: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'regular',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true, validate: true });
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('Role',
      { title: ['regular', 'admin'] }, { returning: true });
  }
};
