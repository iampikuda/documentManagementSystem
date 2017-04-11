import model from '../models';

class documentController {
  /**
   * Method createDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static createDocument(request, response) {
    request.body.ownerId = request.decoded.UserId;
    model.Document.create(request.body)
      .then(newDocument => response.status(201).send(newDocument))
      .catch(error => response.status(400).send(error.errors));
  }

  /**
   * Method getDocuments to obtain all documents
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static getDocuments(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
        .send({ message: 'Only Positive integers are permitted.' });
    }
    model.Document.findAndCountAll({
      where: {
        $or: [
          { access: 'public' },
          { OwnerId: request.decoded.UserId }
        ]
      },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: '"createdAt" DESC'
    })
      .then((documents) => {
        const metadata = limit && offset ? { totalCount: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: documents.rows.length } : null;
        response.status(200).send({ documents: documents.rows, metadata });
      })
      .catch(error => response.status(400).send({ message: error.message }));
  }

  /**
   * Method getDocument to obtain a document
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static getDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404)
            .send({
              message: `No document found with id: ${request.params.id}`
            });
        }
        if (foundDocument.access === 'public') {
          return response.status(200)
            .send(foundDocument);
        }
        if ((foundDocument.access === 'private') &&
          (foundDocument.OwnerId === request.decoded.UserId)) {
          return response.status(200)
            .send(foundDocument);
        }
        if (foundDocument.access === 'role') {
          return model.User.findById(foundDocument.OwnerId)
            .then((documentOwner) => {
              if (documentOwner.roleId === request.decoded.roleId) {
                return response.status(200)
                  .send(foundDocument);
              }
              return response.status(403)
                .send({
                  message: 'You are not permitted to access this document'
                });
            });
        }
        return response.status(403)
          .send({
            message: 'You are not permitted to access this document'
          });
      })
      .catch(error => response.status(400).send({
        message: 'get document error'
      }));
  }

  // /**
  //  * 
  //  * @static
  //  * @param {Object} request - request Object
  //  * @param {Object} response - request Object
  //  * @returns {Object} response Object
  //  * @memberOf documentController
  //  */
  // static getRoleDoc(request, response) {
  //   const limit = request.query.limit || '10';
  //   const offset = request.query.offset || '0';
  //   if (request.query.limit < 0 || request.query.offset < 0) {
  //     return response.status(400)
  //       .send({ message: 'Only Positive integers are permitted.' });
  //   }
  //   model.document.findAndCountAll({
  //     where: { access: request.query.access },
  //     limit,
  //     offset,
  //     order: '"createdAt" DESC'
  //   })
  //   .then((foundDocument) => {
  //     if (!foundDocument) {
  //       return response.status(404)
  //         .send({
  //           message: `No document found for user with id:\
  //           ${request.params.id}`
  //         });
  //     }
  //     const metadata = limit && offset ? { totalCount: foundDocument.count,
  //       pages: Math.ceil(foundDocument.count / limit),
  //       currentPage: Math.floor(offset / limit) + 1,
  //       pageSize: foundDocument.rows.length } : null;
  //     response.status(200).send({ document: foundDocument.rows, metadata });
  //   })
  //   .catch(error => response.status(400).send({
  //     message: 'role document error'
  //   }));
  // }

  /**
   * searchDoc - search documents
   * @param {Object} request Request Object
   * @param {Object} response Response Object
   * @returns {Object} Response Object
   */
  static searchDoc(request, response) {
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
        .send({ message: 'Only Positive integers are permitted.' });
    }

    const userQuery = request.query.query;
    const role = Math.abs(request.query.role, 10);
    const query = {
      where: {
        $and: [{ $or: [
          { access: 'public' },
          { ownerId: request.decoded.UserId }
        ] }],
      },
      limit: request.query.limit,
      offset: request.query.offset,
      order: '"createdAt" DESC'
    };

    if (userQuery) {
      query.where.$and.push({ $or: [
        { title: { $like: `%${userQuery}%` } },
        { content: { $like: `%${userQuery}%` } }
      ] });
    }
    if (role) {
      query.include = [{
        model: model.User,
        as: 'Owner',
        attributes: [],
        include: [{
          model: model.Role,
          attributes: [],
          where: { id: role }
        }]
      }];
    }

    model.document.findAndCountAll(query)
      .then((documents) => {
        const metadata = query.limit && query.offset
        ? { totalCount: documents.count,
          pages: Math.ceil(documents.count / query.limit),
          currentPage: Math.floor(query.offset / query.limit) + 1,
          pageSize: documents.rows.length } : null;
        response.send({ documents: documents.rows, metadata });
      })
      .catch(error => response.status(400).send({
        message: error.message
      }));
  }

  /**
   * Method updateDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static updateDocument(request, response) {
    const Id = request.params.id;
    model.Document.findById(Id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404)
            .send({ message: `No document found with id: ${Id}` });
        }
        if (foundDocument.ownerId !== request.decoded.UserId) {
          return response.status(401).send({
            message: 'You cannot update this document'
          });
        }
        return foundDocument
          .update(request.body)
          .then(() => response.status(200).send(foundDocument));
      })
      .catch(error => response.status(400).send({
        message: error.message
      }));
  }

  /**
   * Method deleteDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static deleteDocument(request, response) {
    model.Document.findById(request.params.id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404)
            .send(
              { message: `No document found with id: ${request.params.id}` });
        }
        if (foundDocument.OwnerId === request.decoded.UserId) {
          foundDocument.destroy()
            .then(() => {
              return response.status(200)
                .send({ message: 'Document successfully deleted' });
            });
        } else {
          return response.status(403)
            .send({ message: 'You are not the Owner of this document.' });
        }
      });
  }
}

export default documentController;
