import express from 'express';
import documentController from '../controllers/documentController';
import auth from '../middleware/auth';

const document = express.Router();

document.route('/api/document')
  .get(auth.verifyToken, documentController.getDocuments)
  .post(auth.verifyToken, documentController.createDocument);

document.route('/api/document/:id')
  .get(auth.verifyToken, documentController.getDocument)
  .put(auth.verifyToken, documentController.updateDocument)
  .delete(auth.verifyToken, documentController.deleteDocument);

document.route('/api/document/search')
  .post(auth.verifyToken, documentController.searchDoc);

module.exports = () => document;
