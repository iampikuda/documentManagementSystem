const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;
const model = require('../../models');
const helper = require('../specHelper');

const adminUserParams = helper.testUser;
const regularUserParams = helper.testUser2;
const adminRoleParams = helper.testRole;
const regularRoleParams = helper.testRole2;

describe('User Authentication', () => {
  let adminToken, adminRole, regularRole, regularToken;
  before((done) => {
    model.sequelize.sync({ force: true}).then(() => {
      model.Role.bulkCreate([adminRoleParams, regularRoleParams], {
    returning: true })
    .then((createdRoles) => {
      adminRole = createdRoles[0];
      regularRole = createdRoles[1];
      adminUserParams.roleId = adminRole.id;
      regularUserParams.roleId = regularRole.id;

      request.post('/users')
        .send(adminUserParams)
        .end((error, response) => {
          adminToken = response.body.token;
          request.post('/users')
            .send(regularUserParams)
            .end((err, res) => {
              regularToken = res.body.token;
              done();
            });
        });
    });
    }).catch(console.log);
  });
  after(() => {
    return model.sequelize.sync({ force: true });
  });

  it('should not authorize a user without a token', (done) => {
    request.get('/users')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
  });
  it('should not authorize a user who supplies invalid token', (done) => {
    request.get('/users')
      .set({ Authorization: 'sushi' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
  });
  it('should not return users if the user is not admin', (done) => {
    request.get('/users')
      .set({ Authorization: regularToken })
      .expect(403, done);
  });
  it('should correctly return all users with valid token and access', (done) => {
    request.get('/users')
      .set({ Authorization: adminToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        // eslint-disable-next-line no-unused-expressions
        expect(Array.isArray(response.body)).to.be.true;
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.body[1].userName).to.equal(adminUserParams.userName);
        done();
      });
  });
});

