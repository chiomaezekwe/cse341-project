
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// Export a function that accepts `app`
module.exports = function (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
};

  const doc = {
  info: {
    title: 'Contacts API',
    description: 'Auto-generated Swagger documentation for Contacts API',
  },
  host: 'three41-project-bzcd.onrender.com',
  schemes: ['https'],
  definitions: {
    Contact: {
      $firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    }
  },
  //host: 'three41-project-bzcd.onrender.com', // Change to Render URL when deploying to Production(dev: localhost:8080; production:https://three41-project-bzcd.onrender.com)
  //schemes: ['https'], // Use 'https' in Production on Render
};

const outputFile = './swagger-output.json'; // Output file
const endpointsFiles = ['./server.js'];      // Entry point to scan for routes

swaggerAutogen(outputFile, endpointsFiles, doc);

