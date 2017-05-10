const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper.js');

const roleParams = helper.testRole;


describe('Role Model', () => {
  describe('Create Role', () => {
    let role;
    before((done) => {
      model.Role.create(roleParams)
        .then((createdRole) => {
          role = createdRole;
          done();
        });
    });
    after(() => model.Role.sequelize.sync({ force: true }));

    it('should be able to create a role', () => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
    });

    it('should be able to create a role that has a title', () => {
      expect(role.title).to.equal(roleParams.title);
    });
  });

  describe('Role Model Validations', () => {
    after(() => model.Role.sequelize.sync({ force: true }));

    describe('Title Field Validation', () => {
      it('should not require title field to create a role', (done) => {
        model.Role.create()
          .then((createdRole) => {
            expect(createdRole.title).to.equal('regular');
            done();
          });
      });
    });
  });
});
