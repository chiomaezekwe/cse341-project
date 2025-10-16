const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    swagger: '2.0', //  Required for Swagger 2.0
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Swagger 2.0 documentation for a REST API used for managing book collection.',
    },
    host: 'localhost:8080',   // Change to Render URL "cse341-library-w7vq.onrender.com" when deploying to Production, and on dev, use "localhost:8080". 
    basePath: '/api',         //  Your base route
    schemes: ['http'],         // Use "https" in Production on Render and "http" in dev 

    // added these lines 16 to 28
    // Add this for JWT security
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description:
          'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
      },
    },

    // (Optional) Apply JWT globally
    // security: [{ Bearer: [] }],    
  },
  apis: ['./routes/*.js'], // Path to route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
