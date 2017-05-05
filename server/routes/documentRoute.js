import express from 'express';
import documentController from '../controllers/documentController';
import auth from '../middleware/auth';

const document = express.Router();
/**
 * @swagger
 * definitions:
 *   NewDocument:
 *     type: object
 *     required:
 *       - title
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: text
 *   Document:
 *     allOf:
 *       - $ref: '#/definitions/NewDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
document.route('/api/document')
  /**
   * @swagger
   * /api/document:
   *   get:
   *     description: Gets all documents
   *     tags:
   *      - Get Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewDocument'
   *     responses:
   *       201:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/Document'
   */
  .get(auth.verifyToken, documentController.getDocuments)
  /**
   * @swagger
   * /api/document:
   *   post:
   *     description: Creates a document
   *     tags:
   *      - Create Document
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewDocument'
   *     responses:
   *       201:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/Document'
   */
  .post(auth.verifyToken, documentController.createDocument);

document.route('/api/document/:id')
  /** @swagger
  *  /api/document/:id:
  *   get:
  *     description: Returns {limit} documents from the the {offset}
  *     tags:
  *       - Get single document
  *     produces:
  *        - application/json
  *     parameters:
  *        - name: Authorization
  *          in: header
  *          description: an authorization header
  *          required: true
  *          type: string
  *     responses:
  *        200:
  *          description: get documents from the database
  *          schema:
  *            type: array
  *            items:
  *              $ref: '#/definitions/Document'
  */
  .get(auth.verifyToken, documentController.getDocument)
  /**
   * @swagger
   * /api/document/:id:
   *   put:
   *     description: Update  a document
   *     tags:
   *      - Update a Document
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewDocument'
   *     responses:
   *       201:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/Document'
   */
  .put(auth.verifyToken, documentController.updateDocument)
  /**
   * @swagger
   * /api/document/1:
   *    delete:
   *      description: Deletes the document with the id of 1
   *      tags:
   *        - Delete document
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        201:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Document'
   */
  .delete(auth.verifyToken, documentController.deleteDocument);

document.route('/api/search/document')
    /** @swagger
    *  /api/search/documents/:
    *   get:
    *     description: Returns {limit} documents from the the {offset}
    *     tags:
    *       - Get documents
    *     produces:
    *        - application/json
    *     parameters:
    *        - name: Authorization
    *          in: header
    *          description: an authorization header
    *          required: true
    *          type: string
    *     responses:
    *        200:
    *          description: get documents from the database
    *          schema:
    *            type: array
    *            items:
    *              $ref: '#/definitions/Document'
    */
  .get(auth.verifyToken, documentController.searchDoc);

module.exports = () => document;
