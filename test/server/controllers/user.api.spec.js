import supertest from 'supertest';
import chai from 'chai';
import app from '../../../app';
import model from '../../../server/models';
import helper from '../test-helper';


const request = supertest(app);
const expect = chai.expect;

const userParams = helper.testUser;
const userParams2 = helper.testUser2;
const userParams3 = helper.testUser3;
const roleParams = helper.testAdminRole;
const roleParams2 = helper.testRegularRole;

describe('User API', () => {
  let user1;
  let user2;
  let user3;
  let token1;
  let token2;
  let token3;
  before(() => model.Role.bulkCreate([roleParams, roleParams2], {
    returning: true })
      .then((createdRoles) => {
        userParams.roleId = createdRoles[0].id;
        userParams2.roleId = createdRoles[1].id;
        userParams3.roleId = createdRoles[1].id;
      }));

  afterEach(() => model.User.destroy({ where: {} }));

  after(() => model.sequelize.sync({ force: true }));

  describe('REQUESTS', () => {
    beforeEach((done) => {
      request.post('/api/user')
        .send(userParams)
        .end((error, response) => {
          user1 = response.body.newUser;
          token1 = response.body.token;

          request.post('/api/user')
            .send(userParams2)
            .end((err, res) => {
              user2 = res.body.newUser;
              token2 = res.body.token;

              request.post('/api/user')
                .send(userParams3)
                .end((err, res) => {
                  user3 = res.body.newUser;
                  token3 = res.body.token;
                  done();
                });
            });
        });
    });
    it('should not create another user with same user name', (done) => {
      request.post('/api/user')
        .send(userParams)
        .expect(409, done);
    });
    it('should get all users when provided valid token & access', (done) => {
      request.get('/api/user')
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          // eslint-disable-next-line no-unused-expressions
          expect(Array.isArray(Object.keys(response.body))).to.be.true;
          expect(response.body.users.length).to.be.greaterThan(0);
          done();
        });
    });

    describe('GET: (/api/user/:id) - GET A USER', () => {
      it('should not return a user id is invalid', (done) => {
        request.get('/api/user/9999')
        .set({ Authorization: token1 })
        .expect(404, done);
      });
      it('should return the user with supplied id', (done) => {
        request.get(`/api/user/${user1.id}`)
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(user1.userName).to.equal(userParams.userName);
          done();
        });
      });
    });

    describe('PUT: (/api/user/:id) - UPDATE', () => {
      it('should not perform update if supplied id is invalid', (done) => {
        request.get('/api/user/9999')
          .set({ Authorization: token1 })
          .expect(404, done);
      });
      it('should update a user if supplied id is valid', (done) => {
        const fieldsToUpdate = {
          firstName: 'Kondo',
          lastName: 'Olopa'
        };
        request.put(`/api/user/${user1.id}`)
          .set({ Authorization: token1 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.firstName).to.equal(fieldsToUpdate.firstName);
            done();
          });
      });
    });

    describe('DELETE: (/api/user/:id) - DELETE A USER', () => {
      it('should not perform a delete if supplied id is invalid', (done) => {
        request.get('/api/user/9999')
          .set({ Authorization: token1 })
          .expect(404, done);
      });
      it('should succesfully delete a user when provided valid id', (done) => {
        request.delete(`/api/user/${user1.id}`)
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            model.User.count()
              .then((userCount) => {
                expect(userCount).to.equal(1);
              });
              done();
          });
      });
      it('should perform delete on request from admin', (done) => {
        request.delete(`/api/user/${user2.id}`)
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
      });

    });

    describe('POST: (/api/user/login) - LOGIN', () => {
      it('should not login when supplied invalid username or password',
      (done) => {
        request.post('/api/user/login')
          .send({
            email: 'userName@mail.com',
            password: 'password'
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.token).to.not.exist;
            done();
          });
      });
      it('should login when supplied valid email & password', (done) => {
        request.post('/api/user/login')
          .send(userParams)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.token).to.exist;
            expect(response.body.expiresIn).to.exist;
            done();
          });
      });
    });

    describe('POST: (/api/user/logout) - LOGOUT', () => {
      it('should logout a user', (done) => {
        request.post('/api/user/logout')
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });
  });
});