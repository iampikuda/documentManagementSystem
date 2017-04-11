import express from 'express';
import documentController from '../controllers/roleController';
import auth from '../middleware/auth';

const document = express.Router();

document.route('/document')
  .all(auth.verifyToken)
  .get(documentController.getDocuments)
  .post(documentController.createDocument);

document.route('/document/:id')
  .all(auth.verifyToken)
  .get(documentController.getDocument)
  .put(documentController.updateDocument)
  .delete(documentController.deleteDocument);

document.route('/document/search')
  .post(auth.verifyToken, documentController.searchDoc);

module.exports = () => document;
