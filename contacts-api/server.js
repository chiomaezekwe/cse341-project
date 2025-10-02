require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger'); // should export the swagger JSON object


const cors = require('cors'); // Imports CORS
const contactRoutes = require('./routes/contactRoutes');
const mongoose = require('./config/db'); // connection to MongoDB;

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors()); //Enables CORS
app.use(express.json());


// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes

/*app.get('/', (req, res) => {
  res.send('Server is working!');
}); //for test to know if the server is working
*/


app.use('/contacts', contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


