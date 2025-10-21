const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Swagger 2.0 documentation for a REST API used for managing book collection.',
    },
    host: 'localhost:8080',   // Change to Render URL "cse341-library-w7vq.onrender.com" when deploying to Production, and on dev, use "localhost:8080". 
    basePath: '/api',         //  Your base route
    schemes: ['http'],         // Use "https" in Production on Render and "http" in dev 

    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description:
          'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
      },
    },

    security: [{ Bearer: [] }],

    // Add this definitions block below security
    definitions: {
      Review: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          user: {
            type: 'string',
            description: 'ID of the user who posted the review',
          },
          restaurant: {
            type: 'string',
            description: 'ID of the restaurant being reviewed',
          },
          rating: {
            type: 'integer',
            format: 'int32',
            description: 'Rating from 1 to 5',
          },
          comment: { type: 'string' },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
    },
  },

  apis: ['./routes/*.js'], // Leave this as is
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
