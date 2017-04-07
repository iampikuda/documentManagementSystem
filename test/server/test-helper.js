import faker from 'faker';


module.exports = {
  testAdminRole: {
    title: 'admin'
  },

  testRegularRole: {
    title: 'regular'
  },

  testUser: {
    firstName: faker.name.firstName().replace(/[.'"`]/g, ''),
    lastName: faker.name.lastName().replace(/[.'"`]/g, ''),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testUser2: {
    firstName: faker.name.firstName().replace(/[.'"`]/g, ''),
    lastName: faker.name.lastName().replace(/[.'"`]/g, ''),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testUser3: {
    firstName: faker.name.firstName().replace(/[.'"`]/g, ''),
    lastName: faker.name.lastName().replace(/[.'"`]/g, ''),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },

  testDocument2: {
    title: faker.finance.accountName(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },

  testDocument3: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph()
  },

  documentsCollection() {
    const documentParams = [];

    for (let i = 0; i <= 15; i += 1) {
      documentParams.push({
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 1
      });
    }

    return documentParams;
  }
};
