// /* eslint-disable no-unused-expressions */

// import chai from 'chai';
// import model from '../../../server/models';
// import helper from '../test-helper';

// const expect = chai.expect;
// const roleParams = helper.testAdminRole;

// describe('Role Model', () => {
//   describe('Create Role', () => {
//     let role;
//     before((done) => {
//       model.Role.create(roleParams)
//       .then((createdRole) => {
//         role = createdRole;
//         // console.log(role,"9=================9")
//         done();
//       });
//     });

//     after(() => model.Role.sequelize.sync({ force: true }));

//     it('should be able to create role', (done) => {
//       expect(role).to.exist;
//       expect(typeof role).to.equal('object');
//       done();
//     });

//     it('should be able to create role with title', (done) => {
//       expect(role.title).to.equal(roleParams.title);
//       done();
//     });
//   });

//   // describe('Role Model Validations', () => {
//   //   after(() => model.Role.sequelize.sync({ force: true }));

//   //   describe('Title Field Validation', () => {
//   //     it('requires title to create role', (done) => {
//   //       model.Role.create()
//   //         .then((roleppp) => {
//   //           console.log("9=================9", roleppp);
//   //         })
//   //         .catch((error) => {
//   //           console.log('------>', error.message);
//   //           console.log('------>', error.name);
//   //           expect(/notNull Violation/.test(error.message)).to.be.true;
//   //           done();
//   //         });
//   //     });

//   //     it('ensures a role is unique', (done) => {
//   //       model.Role.create(roleParams)
//   //         .then(() => {
//   //           // creating a second parameter with the same role title
//   //           model.Role.create(roleParams)
//   //             .catch((error) => {
//   //               console.log('------>', error.message);
//   //           console.log('------>', error.name);
//   //               expect(/UniqueConstraintError/.test(error.name)).to.be.true;
//   //               done();
//   //             });
//   //         });
//   //     });
//   //   });
//   // });
// });
