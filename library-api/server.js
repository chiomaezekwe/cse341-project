require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const cors = require('cors');
const passport = require('passport');
const authRoute = require('./routes/authRoutes'); 


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); //Enables CORS
app.use(express.json());
app.use(passport.initialize());


// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Routes
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');  // <--- Add this line
const reviewRoutes = require('./routes/reviewRoutes');


app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoute);  // <--- Added this line
app.use('/api/reviews', reviewRoutes);


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});


// Optional: - Test Routes
/*app.get('/', (req, res) => {
  res.send('Server is working!');
}); //for test to know if the server is working
*/


// Start server
const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log('Server running on port 8080');
  console.log('Swagger UI available at http://localhost:8080/api-docs');
});
