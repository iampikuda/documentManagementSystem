/* eslint import/no-unresolved: 0 */
/* eslint-disable no-unused-vars */
import model from '../models';

/**
 * Controller for document management
 */
class documentController {
  /**
   * Method createDocument
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static createDocument(request, response) {
    request.body.ownerId = request.decoded.userId;
    model.Document.sync();
    model.Document.findAll({
      where: {
        $and: {
          ownerId: request.decoded.userId
        },
        $or: [
          { title: request.body.title }
        ]
      }
    })
      .then((foundDocument) => {
        if (foundDocument.length > 0) {
          return response.status(409)
            .send({
              message: 'Note: Document with same title or content exists.' +
              'Please modify'
            });
        }
        let Userdata = {};
        let docInfo = {};
        model.Document.create(request.body)
          .then((newDocument) => {
            model.User.findById(newDocument.ownerId)
            .then((founduser) => {
              Userdata.lastName = founduser.lastName;
              Userdata.firstName = founduser.firstName;
              Userdata.roleId = founduser.roleId;
              docInfo = newDocument.dataValues;
              docInfo.User = Userdata;
              // console.log(newDocument, '098-09-=09-08-09-9-09');
              response.status(201).send(docInfo)
            })
            // response.status(201).send(docInfo)
          })
          .catch(error => response.status(400).send({
            message: error.message
          }));
      });
  }

  /**
   * Method getDocuments to obtain all documents
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static getDocuments(request, response) {
    const Id = request.decoded.userId;
    const name = request.decoded.firstName;
    const limit = request.query.limit || '10';
    const offset = request.query.offset || '0';
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
        .send({ message: 'Only Positive integers are permitted.' });
    }
    if (request.decoded.roleId === 1) {
      model.Document.findAndCountAll({
        include: [{
          model: model.User,
          attributes: [
            'firstName', 'lastName', 'roleId'
          ]
        }],
        limit,
        offset,
        order: '"createdAt" ASC'
      })
        .then((foundDocuments) => {
          const metadata = limit && offset ? {
            totalCount: foundDocuments.count,
            pages: Math.ceil(foundDocuments.count / limit),
            currentPage: Math.floor(offset / limit) + 1,
            pageSize: foundDocuments.rows.length
          } : null;
          return response.status(200).send({
            documents: foundDocuments.rows, metadata
          });
        })
        .catch(error => response.status(400).send({ message: error.message }));
    } else {
      model.Document.findAndCountAll({
        include: [{
          model: model.User,
          attributes: [
            'firstName', 'lastName', 'roleId'
          ]
        }],
        where: {
          $or: [
            { access: 'public' },
            { ownerId: request.decoded.userId },
            {
              $and: [
                { access: 'role' },
                { '$User.roleId$': request.decoded.roleId }
              ]
            }
          ]
        },
        limit,
        offset,
        order: '"createdAt" ASC'
      })
        .then((foundDocument) => {
          if (!foundDocument) {
            return response
              .status(404)
              .send({
                message: `User ${name} with id:${Id}` +
                'has no documents he can view'
              });
          }
          const metadata = limit && offset ? {
            totalCount: foundDocument.count,
            pages: Math.ceil(foundDocument.count / limit),
            currentPage: Math.floor(offset / limit) + 1,
            pageSize: foundDocument.rows.length
          } : null;
          return response.status(200).send({
            document: foundDocument.rows, metadata
          });
        })
        .catch(error => response.status(400).send({ message: error.message }));
    }
  }

  /**
   * Method getDocument to obtain a document
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response Object
   */
  static getDocument(request, response) {
    const Id = request.params.id;
    model.Document.findById(Id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404)
            .send({
              message: `There are no document with id: ${Id}`
            });
        }
        if (request.decoded.roleId === 1) {
          return response.status(200)
            .send(foundDocument);
        }
        if (foundDocument.access === 'public') {
          return response.status(200)
            .send(foundDocument);
        }
        if ((foundDocument.access === 'private') &&
          (foundDocument.ownerId === request.decoded.userId)) {
          return response.status(200)
            .send(foundDocument);
        }
        if (foundDocument.access === 'role') {
          return model.User.findById(foundDocument.ownerId)
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
        message: error.message
      }));
  }

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
    let query;
    if (request.decoded.roleId === 1) {
      query = {
        include: [{
          model: model.User,
          attributes: [
            'firstName', 'lastName', 'roleId'
          ]
        }],
        limit,
        offset,
        order: '"createdAt" ASC'
      };
      if (userQuery) {
        query.where = {
          $and: {
            $or: [
              { title: { $iLike: `%${userQuery}%` } },
              { content: { $iLike: `%${userQuery}%` } }
            ]
          }
        };
      }
    } else {
      query = {
        include: [{
          model: model.User,
          attributes: [
            'firstName', 'lastName', 'roleId'
          ]
        }],
        where: {
          $or: [
            { access: 'public' },
            { ownerId: request.decoded.userId },
            {
              $and: [
                { access: 'role' },
                { '$User.roleId$': request.decoded.roleId }
              ]
            }
          ]
        },
        limit,
        offset,
        order: '"createdAt" ASC'
      };
      if (userQuery) {
        query.where.$and = [{
          $or: [
            { title: { $iLike: `%${userQuery}%` } },
            { content: { $iLike: `%${userQuery}%` } }
          ]
        }];
      }
    }


    model.Document.findAndCountAll(query)
      .then((documents) => {
        const metadata = query.limit && query.offset
          ? {
            totalCount: documents.count,
            pages: Math.ceil(documents.count / query.limit),
            currentPage: Math.floor(query.offset / query.limit) + 1,
            pageSize: documents.rows.length
          } : null;
        return response.status(200).send({
          documents: documents.rows, metadata
        });
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
            .send({ message: `There is no document with id: ${Id}` });
        }
        if (foundDocument.ownerId !== request.decoded.userId) {
          return response.status(401).send({
            message: 'You cannot update this document'
          });
        }
        const query = {
          where: {
            $and: {
              ownerId: request.decoded.userId
            },
            $or: [
              { title: request.body.title }
            ]
          }
        };
        let Userdata = {};
        let docInfo = {};
        model.User.findById(foundDocument.ownerId)
          .then((founduser) => {
            Userdata.lastName = founduser.lastName;
            Userdata.firstName = founduser.firstName;
            Userdata.roleId = founduser.roleId;
            // console.log(newDocument, '098-09-=09-08-09-9-09');
            // response.status(201).send(docInfo)
            if (foundDocument.title === request.body.title) {
              return foundDocument
                  .update(request.body)
                  .then(() => {
                    docInfo = foundDocument.dataValues;
                    docInfo.User = Userdata;
                    response.status(200).send(docInfo)
                  });
            }
            model.Document.findAll(query)
              .then((usedDocument) => {
                if (usedDocument.length > 0) {
                  return response.status(409)
                    .send({
                      message: 'Note: Document with same title exists.' +
                      'Please modify'
                    });
                }
                return foundDocument
                  .update(request.body)
                  .then(() => {
                    docInfo = foundDocument.dataValues;
                    docInfo.User = Userdata;
                    response.status(200).send(docInfo)
                  });
              });
          })
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
    const Id = request.params.id;
    model.Document.findById(Id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404)
            .send(
            { message: `There is no document with id: ${Id}` });
        }
        if (foundDocument.ownerId === request.decoded.userId ||
          request.decoded.roleId === 1) {
          foundDocument.destroy()
            .then(() => response.status(200)
              .send({
                message: 'Document successfully deleted',
                Document: foundDocument
              })
            );
        } else {
          return response.status(403)
            .send({ message: 'You are not the Owner of this document.' });
        }
      });
  }
}

export default documentController;
