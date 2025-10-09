const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); //Enables CORS
app.use(express.json());


// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes

/*app.get('/', (req, res) => {
  res.send('Server is working!');
}); //for test to know if the server is working
*/

const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start server
app.listen(8080, () => {
  console.log('Server running on port 8080');
  console.log('Swagger UI available at http://localhost:8080/api-docs');
});
