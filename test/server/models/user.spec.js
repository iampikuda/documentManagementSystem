// import chai from 'chai';
// import models from '../../../server/models';
// import helper from '../test-helper';

// const expect = chai.expect;
// const assert = chai.assert;

// const userParams = helper.testUser;
// const roleParams = helper.testAdminRole;

// const requiredFields = ['firstname', 'lastname', 'email', 'password', 'roleId'];
// const uniqueFields = ['email'];



// describe('TEST', () => {
//   it('should start empty', () => {
//     const arr = [];
//     assert.equal(arr.length, 0);
//   });
// });

// describe('User Model', () => {
//   describe('How User Model Works', () => {
//     let user;
//     before((done) => {
//       models.Role.create(roleParams)
//         .then((createdRole) => {
//           userParams.roleId = createdRole.id;
//           return models.User.create(userParams);
//         })
//         .then((createdUser) => {
//           user = createdUser;
//           console.log('------>', user.lastName, user.firstName);
//           done();
//         });
//     });
    

//     after(() => models.sequelize.sync({ force: true }));

//     it('should be able to create a user', () => {
//       expect(user).not.to.be.null;
//       expect(typeof user).to.equal('object');
//     });
//     it('should create a user with username, first & last name', () => {
//       expect(user.firstName).to.equal(userParams.firstName);
//       expect(user.lastName).to.equal(userParams.lastName);
//     });
//     it('should create a user with a valid email', () => {
//       expect(user.email).to.equal(userParams.email);
//     });
//     it('should create a user with hashed password', () => {
//       expect(user.password).to.not.equal(userParams.password);
//     });
//     it('should create a user with a defined Role', () => {
//       models.User.findById(user.id, { include: [models.Role] })
//         .then((foundUser) => {
//           expect(foundUser.Role.title).to.equal(roleParams.title);
//         });
//     });

//     it('should be able to update a user', (done) => {
//       models.User.findById(user.id)
//         .then((foundUser) => {
//           return foundUser.update({ firstName: 'mogims' });
//         })
//         .then((updatedUser) => {
//           expect(updatedUser.firstName).to.equal('mogims');
//           done();
//         });
//     });
//   });

//   describe('How User model does Validation', () => {
//     let user;
//     beforeEach((done) => {
//       models.Role.create(roleParams)
//         .then((role) => {
//           userParams.roleId = role.id;
//           user = models.User.build(userParams);
//           done();
//         });
//     });

//     afterEach(() => models.sequelize.sync({ force: true }));

//     describe('Required Fields', () => {
//       requiredFields.forEach((field) => {
//         it(`requires ${field} field to create a user`, () => {
//           user[field] = null;
//           return user.save()
//             .catch((error) => {
//               expect(/notNull Violation/.test(error.message)).to.be.true;
//             });
//         });
//       });
//     });

//     describe('Unique Fields', () => {
//       uniqueFields.forEach((field) => {
//         it(`requires ${field} field to be Unique`, () => {
//           user.save()
//             .then((firstUser) => {
//               userParams.roleId = firstUser.roleId;
//               // attempt to create another user with same parameters
//               return models.User.build(userParams).save();
//             })
//             .catch((error) => {
//               expect(/UniqueConstraintError/.test(error.name)).to.be.true;
//             });
//         });
//       });
//     });

//     describe('Mail Validation', () => {
//       it('requires user mail to be authentic', () => {
//         user.email = 'oredavidsyahoo.com';
//         return user.save()
//           .then((unsavedUser) => {
//             expect(unsavedUser).to.exist;
//           })
//           .catch((error) => {
//             expect(/ValidationError/.test(error.name)).to.be.true;
//           });
//       });
//     });

//     // describe('Password Validation', () => {
//     //   it('should be valid if compared', () => {
//     //     return user.save()
//     //       .then((createdUser) => {
//     //         console.log("@@@@@@@@@", createdUser);
//     //         console.log("pkasdjahsdjasgdjasd", userParams);
//     //         expect(createdUser.password).to.equal(userParams.password);
//     //       });
//     //   });
//     // });
//   });
// });
