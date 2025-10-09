const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    swagger: '2.0', //  Required for Swagger 2.0
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Swagger 2.0 documentation for a RESTful API used for managing book collection.',
    },
    host: 'cse341-library-w7vq.onrender.com',   // Change to Render URL "cse341-library-w7vq.onrender.com" when deploying to Production, and on dev, use "localhost:8080". 
    basePath: '/api',         //  Your base route
    schemes: ['https'],         // Use "https" in Production on Render and "http" in dev 
  },
  apis: ['./routes/*.js'], // Path to route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
