const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper.js');

const userParams = helper.testUser;
const roleParams = helper.testRole;

const requiredFields = ['userName', 'firstName', 'lastName', 'email', 'password', 'roleId'];
const uniqueFields = ['userName', 'email'];

describe('User Model', () => {
  describe('How User Model Works', () => {
    let user;
    before((done) => {
      model.Role.create(roleParams)
        .then((createdRole) => {
          userParams.roleId = createdRole.id;
          return model.User.create(userParams);
        })
        .then((createdUser) => {
          user = createdUser;
          done();
        });
    });

    after(() => model.sequelize.sync({ force: true }));

    it('should be able to create a user', () => {
      expect(user).to.exist;
      expect(typeof user).to.equal('object');
    });
    it('should create a user with username, first & last name', () => {
      expect(user.userName).to.equal(userParams.userName);
      expect(user.firstName).to.equal(userParams.firstName);
      expect(user.lastName).to.equal(userParams.lastName);
    });
    it('should create a user with a valid email', () => {
      expect(user.email).to.equal(userParams.email);
    });
    it('should create a user with hashed password', () => {
      expect(user.password).to.not.equal(userParams.password);
    });
    it('should create a user with a defined Role', () => {
      model.User.findById(user.id, { include: [model.Role] })
        .then((foundUser) => {
          expect(foundUser.Role.title).to.equal(roleParams.title);
        });
    });
    it('should be able to update a user', (done) => {
      model.User.findById(user.id)
        .then((foundUser) => {
          return foundUser.update({ userName: 'mogims' });
        })
        .then((updatedUser) => {
          expect(updatedUser.userName).to.equal('mogims');
          done();
        });
    });
  });

  describe('Attributes Validation', () => {
    let user;
    beforeEach((done) => {
      model.Role.create(roleParams)
        .then((role) => {
          userParams.roleId = role.id;
          user = model.User.build(userParams);
          done();
        });
    });

    afterEach(() => model.sequelize.sync({ force: true }));

    describe('Required Fields', () => {
      requiredFields.forEach((field) => {
        it(`requires ${field} field to create a user`, () => {
          user[field] = null;
          return user.save()
            .catch((error) => {
              expect(/notNull Violation/.test(error.message)).to.be.true;
            });
        });
      });
    });

    describe('Unique Fields', () => {
      uniqueFields.forEach((field) => {
        it(`requires ${field} field to be Unique`, () => {
          user.save()
            .then((firstUser) => {
              userParams.roleId = firstUser.roleId;
              return model.User.build(userParams).save();
            })
            .catch((error) => {
              expect(/UniqueConstraintError/.test(error.name)).to.be.true;
            });
        });
      });
    });

    describe('Mail Validation', () => {
      it('requires user mail to be authentic', () => {
        user.email = 'delores yahoo';
        return user.save()
          .catch((error) => {
            expect(/isEmail failed/.test(error.message)).to.be.true;
          });
      });
    });

    describe('Password Validation', () => {
      it('should be valid if compared', () => {
        user.save()
          .then((createdUser) => {
            expect(createdUser.validPassword(userParams.password)).to.be.true;
          });
      });
    });
  });
});
