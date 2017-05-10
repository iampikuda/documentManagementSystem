// const expect = require("chai").expect;
// const httpMocks = require("node-mocks-http");
// const authentication = require('../../middleware/authentication')
// const sinon = require('sinon');
// const jwt = require('jsonwebtoken');
// const supertest = require('supertest');
// const app = require('../../../server');
// const model = require('../../models');
// const helper = require('../specHelper');
// const events = require('events')

// const request = supertest.agent(app);
// let adminJwtToken;
// let userJwtToken;
// let req;

// const ad

// const responseEvent = () => httpMocks
//   .createResponse({ eventEmitter: events.EventEmitter });
// describe('Test Authentication Middleware', function(){

//     before(() =>
//       model.Role.create(roleParams)
//         .then((role) => {
//           params.RoleId = role.id;
//           request.post('/users')
//             .send(params)
//             .end((err, res) => {
//               token = res.body.token;
//             });
//       }));

//     after(() => model.sequelize.sync({ force: true }));

//     it('should return 401 status code if no token is supplied', (done) => {
//       request.get('/users')
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           done();
//       });
//     });

//     it.only('next should not be called if no token provided', () => {
//         authentication(request, res, next);
//         expect(next.called).to.equal(false);
//     });

//     it('should return 401 status code if no token provided', () => {
//         auth(request, response, next);
//         expect(response.status.getCall(0).args[0]).to.equal(401);
//     });

//     it('next should not be called if bad token was provided', () => {
//         request.headers = {};
//         request.headers.authorization = 'some authorization header';
//         auth(request, response, next);
//         expect(next.called).to.equal(false);
//     });

//     it('should return 401 status code if bad token was provided', () => {
//         request.headers = {};
//         request.headers.authorization = 'some authorization header';
//         auth(request, response, next);
//         expect(response.status.getCall(0).args[0]).to.equal(401);
//     });

//     // it('request should contain user info if good token was provided', function() {
//     //     request.headers = {};
//     //     request.headers.authorization = jwt.sign({ id: 1 }, config.JWT_SECRET);
//     //     auth(request, response, next);
//     //     expect(request).to.have.property('user');
//     //     expect(request.user).to.have.property('id');
//     //     expect(request.user.id).to.be.equal(1);
//     // });

//     // it('next should be called once if good token was provided', function() {
//     //     request.headers = {};
//     //     request.headers.authorization = jwt.sign({ id: 1 }, config.JWT_SECRET);
//     //     auth(request, response, next);
//     //     expect(next.calledOnce).to.equal(true);
//     // });
// });