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
  .get(roleController.getRoles)
  .post(roleController.createRole);

module.exports = () => role;
