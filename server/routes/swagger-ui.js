import express from 'express';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swagger = express.Router();

swagger.route('/docs')
  .get((req, res) => {
    res.status(200)
      .sendFile(path.resolve('api-docs', 'index.html'));
  });

module.exports = () => swagger;
