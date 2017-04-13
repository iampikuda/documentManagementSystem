import supertest from 'supertest';
import chai from 'chai';
import app from '../../../app';
import helper from '../test-helper';
import model from '../../../server/models';

const request = supertest(app)
const expect = chai.expect;
const adminUserParams = helper.testUser;
const regularUserParams = helper.testUser2;
const adminRoleParams = helper.testRole;
const regularRoleParams = helper.testRole2;

describe('User Authentication', () => {
  let adminToken, adminRole, regularRole, regularToken;
  before((done) => {
    model.Role.bulkCreate([adminRoleParams, regularRoleParams], {
      returning: true })
      .then((createdRoles) => {
        adminRole = createdRoles[0];
        regularRole = createdRoles[1];
        adminUserParams.RoleId = adminRole.id;
        regularUserParams.RoleId = regularRole.id;

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
      .set({ Authorization: 'trinity' })
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
  it('should correctly return all users with valid token and access',
  (done) => {
    request.get('/users')
      .set({ Authorization: adminToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        // eslint-disable-next-line no-unused-expressions
        expect(Array.isArray(response.body)).to.be.true;
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.body[0].userName).to.equal(adminUserParams.userName);
        done();
      });
  });
});
