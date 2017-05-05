import express from 'express';
import roleController from '../controllers/roleController';
import auth from '../middleware/auth';

const role = express.Router();
/**
 * @swagger
 * definitions:
 *   NewRole:
 *     type: object
 *     required:
 *       - role
 *     properties:
 *       role:
 *         type: string
 *   Role:
 *     allOf:
 *       - $ref: '#/definitions/NewRole'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
role.route('/api/role')
  .all(auth.verifyToken, auth.adminAccess)
    /**
  * @swagger
    * /api/roles:
    *    get:
    *      description: Returns all roles
    *      tags:
    *        - Get roles
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
    *          description: roles
    *          schema:
    *            type: array
    *            items:
    *              $ref: '#/definitions/Role'
    */
  .get(roleController.getRoles)
    /**
     * @swagger
     * /api/roles:
     *   post:
     *     description: Creates a role
     *     tags:
     *      - Create Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: Role object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewRole'
     *     responses:
     *       201:
     *         description: role
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Role'
     */
    .post(roleController.createRole);

module.exports = () => role;
