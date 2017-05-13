import supertest from 'supertest';
import chai from 'chai';
import app from '../../../app';
import model from '../../../server/models';
import helper from '../test-helper';


const request = supertest(app);
const expect = chai.expect;

const adminRoleParam = helper.testAdminRole;
const regularRoleParam = helper.testRegularRole;
const userParam = helper.testUser;

describe('Role API', () => {
  let token;
  let role;

  before((done) => {
    model.Role.create(adminRoleParam)
      .then((adminRole) => {
        userParam.roleId = adminRole.id;
        request.post('/api/user')
          .send(userParam)
          .end((error, response) => {
            token = response.body.token;
            expect(response.status).to.equal(201);
            model.Role.create(regularRoleParam)
              .then((regularRole) => {
                role = regularRole;
                done();
              });
                // done();
          });
      });
  });

  afterEach(() => model.Role.destroy({ where: { id: role.id } }));
  after(() => model.Role.destroy({ where: { } }));

  describe('REQUESTS', () => {
    describe('POST: (/api/role) - CREATE ROLE', () => {
      it('should create a role when required field is valid', (done) => {
        const newRole1 = { title: 'super admin' };
        request.post('/api/role')
          .set({ Authorization: token })
          .send(newRole1)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(newRole1.title);
            done();
          });
      });
      it('should not create a role when required field is invalid', (done) => {
        const newRole2 = { name: 'guest' };
        request.post('/api/role')
          .set({ Authorization: token })
          .send(newRole2)
          .expect(400, done);
      });
      it('should not create another super admin role', (done) => {
        const newRole3 = {title: 'super admin' };
        request.post('/api/role')
          .set({ Authorization: token })
          .send(newRole3)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('Role already taken.');
            done();
          });
      });
      it('should not create a role with null title', (done) => {
        const newRole4 = { title: null };
        request.post('/api/role')
          .set({ Authorization: token })
          .send(newRole4)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.text).to.equal(
              'notNull Violation: title cannot be null'
              );
            done();
          });
      });
    });

    describe('GET: (/api/role)', () => {
      it('should not return roles where no token is provided', (done) => {
        request.get('/api/role')
          .expect(401, done);
      });
      it('should not return roles where token is invalid', (done) => {
        request.get('/api/role')
          .set({ Authorization: 'jbugubhbhkbkbkb' })
          .expect(401, done);
      });
      it('should return roles where token is valid', (done) => {
        request.get('/api/role')
          .set({ Authorization: token })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            // eslint-disable-next-line no-unused-expressions
            expect(Array.isArray(Object.keys(response.body))).to.be.true;
            expect(Object.keys(response.body).length).to.be.greaterThan(0);
            done();
          });
      });
    });
  });
});
