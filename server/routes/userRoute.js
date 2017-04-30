import express from 'express';
import userController from '../controllers/userController';
// import documentController from '../controllers/documentController';
import auth from '../middleware/auth';
// import utils    from '../middlewares/utils';

const user = express.Router();

user.route('/api/user')
  .get(auth.verifyToken, auth.adminAccess, userController.getAllUsers)
  .post(userController.createUser);

user.route('/api/user/profile')
  .get(auth.verifyToken, userController.getProfile);

user.route('/api/user/admin')
  .get(auth.verifyToken, auth.adminAccess, userController.getAllAdmin)
  .post(auth.verifyToken, auth.adminAccess, userController.createUser);

user.route('/api/user/regular')
  .get(auth.verifyToken, userController.getAllRegular)
  .post(auth.verifyToken, userController.createUser);

user.route('/api/user/:id')
  .get(auth.verifyToken, userController.getUser)
  .put(auth.verifyToken, userController.updateUser)
  .delete(auth.verifyToken, userController.deleteUser);

// user.route('/api/user/:id/documents')
  // .all(auth.verifyToken)
//   .get(documentsController.getUserDocuments);

user.route('/api/user/login')
  .post(userController.login);

user.route('/api/user/logout')
  .post(auth.verifyToken, userController.logout);

module.exports = () => user;
