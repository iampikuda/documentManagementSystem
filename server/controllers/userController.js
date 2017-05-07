/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import model from '../models';

const secret = process.env.SECRET_TOKEN || 'secret';

// To create text-friendly user details

/**
 * Class UserController
 * To handle routing logic for User route
 */
class UserController {

  /**
   * Method for formatting user details
   * @static
   * @param {Object} user - Server res
   * @returns {Object} return object
   * @memberof UserController
   */
  static formattedUser(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId
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
        if (request.body.roleId === '1') {
          if (request.decoded.roleId === 1) {
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
                  .send(error);
              });
          } else {
            return response.status(403)
              .send({
                message: 'You are not authorized for this request.' +
                ' Contact Admin!'
              });
          }
        }
        if (request.body.roleId === 99) {
          request.body.roleId = 2;
        }
        model.User.create(request.body)
          .then((newUser) => {
            const token = jwt.sign({
              userId: newUser.id,
              roleId: newUser.roleId,
              firstName: newUser.firstName,
              email: newUser.email,
            }, secret, { expiresIn: '2 days' });
            newUser = UserController.formattedUser(newUser);
            return response.status(201)
              .send({ newUser, token, expiresIn: '2 days' });
          })
          .catch((error) => {
            return response.status(400)
              .send(error);
          });
      });
  }

  /**
   * Method deleteUser to delete a single user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static deleteUser(request, response) {
    const Id = Number(request.params.id);
    model.User.findById(Id)
      .then((foundUser) => {
        if (!foundUser) {
          return response
            .status(404)
            .send({ message: `There is no user with id: ${Id}` });
        }
        if (request.body.roleId === '1') {
          if (request.decoded.roleId !== 1) {
            return response.status(403)
              .send({
                message: 'You are not authorized to delete an Admin.' +
                ' Contact Admin!'
              });
          }
        }

        foundUser.destroy()
          .then(() => response.status(200)
            .send({
              User: foundUser,
              Message: 'User succesfully deleted'
            })
          );
      });
  }

  /**
   * Method updateUser
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static updateUser(request, response) {
    const Id = request.params.id;
    model.User.findById(Id)
      .then((foundUser) => {
        if (!foundUser) {
          return response
            .status(404)
            .send({ message: `There is no user with id: ${Id}` });
        }
        if (request.body.roleId === '1') {
          if (request.decoded.roleId !== 1) {
            return response.status(403)
              .send({
                message: 'You are not authorized to create an Admin.' +
                ' Contact Admin!'
              });
          }
        }
        foundUser.update(request.body)
          .then((updatedUser) => {
            updatedUser = UserController.formattedUser(updatedUser);
            return response
              .status(200)
              .send(updatedUser);
          })
          .catch(error => response.status(400).send({
            Error: error.message
          }));
      });
  }

  /**
   * Method getUser to get a single user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} - response object
   */
  static getProfile(request, response) {
    const Id = request.decoded.userId;
    model.User.findById(Id)
      .then((foundUser) => {
        if (!foundUser) {
          return response
          .status(404)
          .send({ message: 'You don\'t seem to exist' });
        }

        foundUser = UserController.formattedUser(foundUser);
        return response.status(200).send(foundUser);
      });
  }

  /**
   * Method getUser to get a single user
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} - response object
   */
  static getUser(request, response) {
    const Id = request.params.id;
    model.User.findById(Id)
      .then((foundUser) => {
        if (!foundUser) {
          return response
          .status(404)
          .send({ message: `There is no user with id: ${request.params.id}` });
        }

        foundUser = UserController.formattedUser(foundUser);
        return response.status(200).send(foundUser);
      });
  }

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
      order: '"createdAt" ASC'
    }).then((user) => {
      const metadata = limit && offset ? { totalCount: user.count,
        pages: Math.ceil(user.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: user.rows.length } : null;
      return response.status(200).send({ users: user.rows, metadata });
    })
    .catch(error => response.status(400).send({
      Error: error.message
    }));
  }

  /**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static getAllRole(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    const queryRole = request.query.role;
    if (queryRole === '1') {
      if (request.decoded.roleId !== 1) {
        return response.status(401).send({
          message: 'You are not authorized to get all admin'
        });
      }
    }
    model.User.findAndCountAll({
      include: [{
        model: model.Role,
        attributes: ['title']
      }],
      limit,
      offset,
      order: '"createdAt" ASC',
      where: {
        roleId: queryRole
      }
    }).then((users) => {
      if (users.count === 0) {
        return response.status(404)
        .send({ message: 'There are no users with this role.' });
      }
      const metadata = limit && offset ? { totalCount: users.count,
        pages: Math.ceil(users.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: users.rows.length } : null;
      return response.status(200).send({
        Role: users.rows[0].Role.title,
        users: users.rows,
        metadata
      });
    })
    .catch(error => response.status(400).send({
      message: error.message
    }));
  }

  /**
   * Method getUsers to obtain all users
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {Object} response object
   */
  static getAllAdmin(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    model.User.findAndCountAll({
      limit,
      offset,
      order: '"createdAt" ASC',
      where: {
        roleId: 1
      }
    }).then((user) => {
      const metadata = limit && offset ? { totalCount: user.count,
        pages: Math.ceil(user.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: user.rows.length } : null;
      return response.status(200).send({ users: user.rows, metadata });
    });
  }

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
          if (!foundUser) {
            return response.status(404)
            .send({ message: 'User does not exist' });
          }
          if (foundUser && foundUser.verifyPassword(request.body.password)) {
            const token = jwt.sign({
              firstName: foundUser.firstName,
              userId: foundUser.id,
              roleId: foundUser.roleId
            }, secret, { expiresIn: '2 days' });
            return response.status(200)
              .send({
                message: "You're signed in",
                foundUser,
                token,
                expiresIn: '2 days'
              });
          }
          return response.status(401)
            .send({ message: 'Log in Failed' });
        });
    } else {
      return response.status(400)
        .send({ message: 'Missing Login Credentials' });
    }
  }

  /**
   * Method logout
   * @param {object} request - request object
   * @param {object} response - response object
   * @returns {object} - response object
   */
  static logout(request, response) {
    return response.status(200)
      .send({ message: 'Successful logout' });
  }

  /**
   * Method to search for all users
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static searchUsers(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
        .send({ message: 'Offset and limit can only be positive integers.' });
    }

    const userQuery = request.query.query;
    const query = {
      attributes: ['id', 'firstName', 'lastName', 'email', 'roleId'],
      limit,
      offset,
      order: '"createdAt" ASC'
    };
    if (userQuery) {
      query.where = {
        $and: {
          $or: [
            { firstName: { $iLike: `%${userQuery}%` } },
            { lastName: { $iLike: `%${userQuery}%` } }
          ]
        }
      };
    }

    model.User.findAndCountAll(query)
      .then((users) => {
        const metadata = query.limit && query.offset
          ? {
            totalCount: users.count,
            pages: Math.ceil(users.count / query.limit),
            currentPage: Math.floor(query.offset / query.limit) + 1,
            pageSize: users.rows.length
          } : null;
        response.send({ users: users.rows, metadata });
      })
      .catch(error => response.status(400).send({
        message: error.message
      }));
  }
}

export default UserController;
