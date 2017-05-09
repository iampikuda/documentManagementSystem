import express from 'express';
import userController from '../controllers/userController';
// import documentController from '../controllers/documentController';
import auth from '../middleware/auth';
// import utils    from '../middlewares/utils';

const user = express.Router();
/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - firstname
 *       - lastname
 *       - username
 *       - email
 *       - password
 *     properties:
 *       firstname:
 *         type: string
 *         example: Han
 *       lastname:
 *         type: string
 *         example: Solo
 *       username:
 *         type: string
 *         example: g-pirate
 *       password:
 *         type: string
 *         format: password
 *         example: millenium-falcon
 *       email:
 *         type: string
 *         example: hansolo@documan.api
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 *   NewLogin:
 *    type: object
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *        format: password
 *   Login:
 *    allOf:
 *      - $ref: '#/definitions/NewLogin'
 *
 */
user.route('/api/user')
  /**
   * @swagger
   * /api/user:
   *    get:
   *      description: Returns all users
   *      tags:
   *        - Get users
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  /** @swagger
   *  /api/users/?limit=4&offset=2:
   *   get:
   *     description: Returns {limit} users from the the {offset}
   *     tags:
   *       - Get users with limit
   *     produces:
   *        - application/json
   *     parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *     responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  .get(auth.verifyToken, auth.adminAccess, userController.getAllUsers)
  /**
   * @swagger
    * /api/user:
    *   post:
    *     description: Creates a user
    *     tags:
    *      - Create User
    *     produces:
    *      - application/json
    *     parameters:
    *       - name: body
    *         description: User object
    *         in:  body
    *         required: true
    *         type: string
    *         schema:
    *           $ref: '#/definitions/NewUser'
    *     responses:
    *       201:
    *         description: users
    *         schema:
    *          type: object,
    *          items:
    *            $ref: '#/definitions/User'
    */
  .post(userController.createUser);

user.route('/api/user/profile')
  .get(auth.verifyToken, userController.getProfile);

user.route('/api/user/admin')
  /**
   * @swagger
   * /api/user/admin:
   *    get:
   *      description: Returns all Admin users
   *      tags:
   *        - Get Admin
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  /** @swagger
   *  /api/user/admin/?limit=4&offset=2:
   *   get:
   *     description: Returns {limit} users from the the {offset}
   *     tags:
   *       - Get Admin users with limit
   *     produces:
   *        - application/json
   *     parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *     responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  .get(auth.verifyToken, auth.adminAccess, userController.getAllAdmin);

user.route('/api/user/role')
  /**
   * @swagger
   * /api/user/role:
   *    get:
   *      description: Returns different role users
   *      tags:
   *        - Get role users
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  /** @swagger
   *  /api/user/admin/?limit=4&offset=2:
   *   get:
   *     description: Returns {limit} users from the the {offset}
   *     tags:
   *       - Get Admin users with limit
   *     produces:
   *        - application/json
   *     parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *     responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  .get(auth.verifyToken, userController.getAllRole);

user.route('/api/user/:id')
  /**
   * @swagger
   * /api/users/1:
   *    get:
   *      description: Returns the user with the id of 1
   *      tags:
   *        - Get user
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  .get(auth.verifyToken, userController.getUser)
  /**
   * @swagger
   * /api/users/1:
   *   put:
   *     description: Creates a user
   *     tags:
   *      - Update User
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/User'
   */
  .put(auth.verifyToken, userController.updateUser)
  /**
   * @swagger
   * /api/users/1:
   *    delete:
   *      description: Deletes the user with the id of 1
   *      tags:
   *        - Delete user
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
  .delete(auth.verifyToken, userController.deleteUser);

user.route('/api/user/login')
  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     description: Logs in a user
   *     tags:
   *      - Login User
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewLogin'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/Login'
   */
  .post(userController.login);

user.route('/api/search/user')
  /** @swagger
    *  /api/search/users/:
    *   get:
    *     description: Returns {limit} users from the {offset}
    *     tags:
    *       - Search users
    *     produces:
    *        - application/json
    *     parameters:
    *        - name: Authorization
    *          in: header
    *          description: an authorization header
    *          required: true
    *          type: string
    *     responses:
    *        200:
    *          description: get users from the database
    *          schema:
    *            type: array
    *            items:
    *              $ref: '#/definitions/Document'
    */
  .get(auth.verifyToken, userController.searchUsers);

user.route('/api/user/logout')
  .post(auth.verifyToken, userController.logout);

module.exports = () => user;
