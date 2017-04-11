import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import model from '../models';

const secret = process.env.SECRET_TOKEN || 'secret';

// To create text-friendly user details

/**
 * Class UserController
 * To handle routing logic for documents route
 */
class UserController {

  static formattedUser(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Method createUser to create a user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} - response object
   */
  static createUser(request, response) {
    model.User.findOne({ where: { email: request.body.email } })
      .then((foundUser) => {
        if (foundUser) {
          return response.status(409)
            .send({ message: `${request.body.email} is already in use` });
        }

        model.User.create(request.body)
          .then((newUser) => {
            const token = jwt.sign({
              userId: newUser.id,
              roleId: newUser.roleId
            }, secret, { expiresIn: '2 days' });

            newUser = UserController.formattedUser(newUser);
            return response.status(201)
              .send({ newUser, token, expiresIn: '2 days' });
          })
          .catch((error) => {
            return response.status(400)
              .send(error.errors);
          });
      });
  }

//   /**
//    * Method deleteUser to delete a single user
//    * @param {object} request - request object
//    * @param {object} response - response object
//    * @returns {object} - response object
//    */
//   static deleteUser(request, response) {
//     const Id = Number(request.params.id);
//     model.User.findById(Id)
//       .then((foundUser) => {
//         if (!foundUser) {
//           return response
//           .status(404)
//           .send({ message: `Ǹo user with id: ${Id}` });
//         }

//         foundUser.destroy()
//           .then(() => {
//             return response.status(200)
//               .send({ message: 'User succesfully deleted' });
//           });
//       });
//   }

//   /**
//    * Method updateUser
//    * @param {object} request - request object
//    * @param {object} response - response object
//    * @returns {object} - response object
//    */
//   static updateUser(request, response) {
//     const Id = request.params.id;
//     model.User.findById(Id)
//       .then((foundUser) => {
//         if (!foundUser) {
//           return response
//           .status(404)
//           .send({ message: `Ǹo user with id: ${Id}` });
//         }

//         foundUser.update(request.body)
//           .then((updatedUser) => {
//             updatedUser = UserController.formattedUser(updatedUser);
//             return response
//               .status(200)
//               .send(updatedUser);
//           });
//       });
//   }

//   /**
//    * Method getUser to get a single user
//    * @param {object} request - request object
//    * @param {object} response - response object
//    * @returns {Object} - response object
//    */
//   static getUser(request, response) {
//     const Id = request.params.id;
//     model.User.findById(Id)
//       .then((foundUser) => {
//         if (!foundUser) {
//           return response
//           .status(404)
//           .send({ message: `Ǹo user with id: ${request.params.id}` });
//         }

//         foundUser = UserController.formattedUser(foundUser);
//         return response.send(foundUser);
//       });
//   }
// /* ------------------------------------------------------------- */
  /**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static getAllUsers(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    model.User.findAndCountAll({
      limit,
      offset,
      order: '"createdAt" DESC'
    }).then((user) => {
      const data = limit && offset ? { totalCount: user.count,
        pages: Math.ceil(user.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: user.rows.length } : null;
      return response.status(200).send({ users: user.rows, data });
    })
    .catch(error => response.status(400).send({
      message: error
    }));
  }

//   /**
//    * Method getUsers to obtain all users
//    * @param {object} request - request object
//    * @param {object} response - response object
//    * @returns {Object} response object
//    */
//   static getAllRegular(request, response) {
//     model.User.findAll({
//       where: {
//         roleId: 2
//       }
//     }).then((user) => {
//       return response.status(200)
//         .send(user);
//     });
//   }

//   /**
//    * Method getUsers to obtain all users
//    * @param {object} request - request object
//    * @param {object} response - response object
//    * @returns {Object} response object
//    */
//   static getAllAdmin(request, response) {
//     model.User.findAll({
//       where: {
//         roleId: 1
//       }
//     }).then((user) => {
//       return response.status(200)
//         .send(user);
//     });
//   }

  /**
   * Method login
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static login(request, response) {
    if (request.body.email && request.body.password) {
      model.User.findOne({ where: { email: request.body.email } })
        .then((foundUser) => {
          // console.log(foundUser.password);
          if (foundUser && foundUser.verifyPassword(request.body.password)) {
            const token = jwt.sign({
              userId: foundUser.id,
              roleId: foundUser.roleId
            }, secret, { expiresIn: '2 days' });
            return response.status(200)
              .send({ token, expiresIn: '2 days' });
          }
          return response.status(401)
            .send({ message: 'Log in Failed' });
        });
      return response.status(404)
            .send({ message: 'User not found' });
    }
    return response.status(400)
            .send({ message: 'Missing Login Credentials' });
  }

//   /**
//    * Method logout
//    * @param {object} request - request object
//    * @param {object} response - response object
//    * @returns {object} - response object
//    */
//   static logout(request, response) {
//     return response.status(200)
//       .send({ message: 'Successful logout' });
//   }

  // /**
  //  * Method to fetch all documents of a specific user
  //  * @param{Object} request - Request object
  //  * @param{Object} response - Response object
  //  * @return{Void} - returns void
  //  */
  // static fetchUserDocuments(request, response) {
  //   const id = Number(request.params.id);
  //   const requesterRoleId = request.decoded.roleId;
  //   const requesterId = request.decoded.userId;
  //   model.User.findById(id, {
  //     attributes: ['id', 'firstName', 'lastName', 'email', 'roleId'],
  //     include: {
  //       model: model.Document,
  //       attributes: ['id', 'access', 'title', 'content', 'ownerId', 'createdAt']
  //     }
  //   })
  //   .then((user) => {
  //     if (user) {
  //       const documents = user.Documents.filter((document) => {
  //         if (Authenticator.verifyAdmin(requesterRoleId)) {
  //           return true;
  //         // for other users, ensure they have appropriate access rights
  //         } else if (
  //           (document.access === 'public' ||
  //           requesterRoleId === user.roleId)
  //           && document.access !== 'private') {
  //           return true;
  //         } else if (document.access === 'private'
  //           && document.ownerId === requesterId) {
  //           return true;
  //         }
  //         return false;
  //       });
  //       const safeUser = Object.assign(
  //         {},
  //         UserController.getSafeUserFields(user),
  //         { documents });
  //       ResponseHandler.sendResponse(
  //         response,
  //         200,
  //         safeUser
  //       );
  //     } else {
  //       ResponseHandler.send404(response);
  //     }
  //   });
  // }
}

export default UserController;
