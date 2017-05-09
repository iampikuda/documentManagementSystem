import jwt from 'jsonwebtoken';
import model from '../models';

const secret = 'secret';
/**
 * Class to implement authentication middlewares
 */
const Auth = {
  /**
   * Method to authenticate a user before proceeding
   * to protected routes
   * @param {Object} request - The req Object
   * @param {Object} response - The res Object
   * @param {Function} next - Function call to move to the next middleware
   * or endpoint controller
   * @return {Void} - Returns void
   */
  verifyToken(request, response, next) {
    const token = request.headers.authorization ||
      request.body.token || request.headers['x-access-token'];
    if (!token) {
      return response.status(401)
      .send({ message: 'No token supplied' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return response.status(401)
            .send({ message: 'Token Invalid' });
      }
      request.decoded = decoded;
      return next();
    });
  },
  /**
   * Method to verify that user is an Admin
   * to access Admin endpoints
   * @param{Object} request - req Object
   * @param{Object} response - res Object
   * @param{Object} next - Function to pass flow to the next controller
   * @return{Void} - returns Void
   */
  adminAccess(request, response, next) {
    model.Role.findById(request.decoded.roleId)
      .then((Role) => {
        if (Role.title.toLowerCase() === 'admin') {
          next();
        } else {
          return response.status(403)
            .send({ message: 'User is unauthorized for this request.' });
        }
      });
  }
};

module.exports = Auth;
