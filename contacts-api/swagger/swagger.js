// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'Contacts API',
    version: '1.0.0',
    description: 'Swagger 2.0 documentation for Contacts API',
  },
  host: 'three41-project-bzcd.onrender.com',    // Change to Render URL "three41-project-bzcd.onrender.com" when deploying to Production, and on dev, use "localhost:8080". 
  basePath: '/',                               // base path
  schemes: ['https', 'http'],                 // Use "https" in Production on Render and "http" in dev 
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // where your route JSDoc comments live
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;