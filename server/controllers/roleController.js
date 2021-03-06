/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import model from '../models';

/**
 * Class to implement Role controlllers
 */
class roleController {

  /**
   * Method createRole
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static createRole(request, response) {
    model.Role.sync();
    model.Role.create(request.body)
      .then((newRole) => {
        response.status(201).send(newRole)
      })
      .catch(error => response.status(400).send(error.message)
      );
  }

  /**
   * Method getRoles to obtain all roles
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static getRoles(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    model.Role.findAndCountAll({
      limit,
      offset,
      order: '"createdAt" ASC'
    })
      .then((roles) => {
        if (!roles) {
          return response.status(404).send({ msg: 'role does not exist' });
        }
        const metadata = limit && offset ? { totalCount: roles.count,
          pages: Math.ceil(roles.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: roles.rows.length } : null;
        return response.status(200).send({ roles: roles.rows, metadata });
      })
      .catch(error => response.status(400).send(error.message));
  }
}

export default roleController;
