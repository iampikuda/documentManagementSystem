import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';

const router = express.Router();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'PK-Docman',
    version: '1.0.0',
    description: 'PK-Docman RESTful API with Swagger',
  }
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/documentRoute.js', './server/routes/userRoute.js',
    './server/routes/roleRoute.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


router.route('/api/swagger.json')
  .get((req, res) => {
    res.send(swaggerSpec);
  });

module.exports = () => router;
