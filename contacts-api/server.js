require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger-output.json');

const cors = require('cors'); // Imports CORS
const contactRoutes = require('./routes/contactRoutes');
const mongoose = require('./config/db'); // connection to MongoDB;
const setupSwagger = require('./swagger/swagger');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); //Enables CORS
app.use(express.json());


// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// Routes

/*app.get('/', (req, res) => {
  res.send('Server is working!');
}); //for test to know if the server is working
*/


app.use('/contacts', contactRoutes);

// Swagger docs
setupSwagger(app);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


