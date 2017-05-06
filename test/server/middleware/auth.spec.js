// import supertest from 'supertest';
// import chai from 'chai';
// import app from '../../../app';
// import helper from '../test-helper';
// import model from '../../../server/models';

// const request = supertest(app);
// const expect = chai.expect;
// const adminUserParams = helper.testUser;
// const regularUserParams = helper.testUser2;
// const adminRoleParams = helper.testRole;
// const regularRoleParams = helper.testRole2;

// describe('User Authentication', () => {
//   let adminToken, adminRole, regularRole, regularToken;
//   before((done) => {
//     model.sequelize.sync({ force: true }).then(() => {
//       model.Role.bulkCreate([adminRoleParams, regularRoleParams], {
//         returning: true })
//     .then((createdRoles) => {
//       adminRole = createdRoles[0];
//       regularRole = createdRoles[1];
//       adminUserParams.roleId = adminRole.id;
//       regularUserParams.roleId = regularRole.id;

//       request.post('/api/user')
//         .send(adminUserParams)
//         .end((error, response) => {
//           adminToken = response.body.token;
//           request.post('/api/user')
//             .send(regularUserParams)
//             .end((err, res) => {
//               regularToken = res.body.token;
//               done();
//             });
//         });
//     });
//     }).catch(console.log);
//   });
//   after(() => {
//     return model.sequelize.sync({ force: true });
//   });

//   it('should not authorize a user without a token', (done) => {
//     request.get('/api/user')
//       .end((error, response) => {
//         expect(response.status).to.equal(401);
//         done();
//       });
//   });
//   it('should not authorize a user who supplies invalid token', (done) => {
//     request.get('/api/user')
//       .set({ Authorization: 'sushi' })
//       .end((error, response) => {
//         expect(response.status).to.equal(401);
//         done();
//       });
//   });
//   it('should not return users if the user is not admin', (done) => {
//     request.get('/api/user')
//       .set({ Authorization: regularToken })
//       .expect(403, done);
//   });
//   it('should correctly return all users with valid token and access', (done) => {
//     request.get('/api/user')
//       .set({ Authorization: adminToken })
//       .end((error, response) => {
//         expect(response.status).to.equal(200);
//         // eslint-disable-next-line no-unused-expressions
//         expect(Array.isArray(response.body)).to.be.true;
//         expect(response.body.length).to.be.greaterThan(0);
//         expect(response.body[1].userName).to.equal(adminUserParams.userName);
//         done();
//       });
//   });
// });
