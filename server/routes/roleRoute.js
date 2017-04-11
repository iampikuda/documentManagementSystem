import express from 'express';
import roleController from '../controllers/roleController';
import auth from '../middleware/auth';

const role = express.Router();

role.route('/')
  .all(auth.verifyToken, auth.adminAccess)
  .get(roleController.getRoles)
  .post(roleController.createRole);

module.exports = () => role;
