require('dotenv').config();
const express = require('express');
const contactRoutes = require('./routes/contactRoutes');
const mongoose = require('./config/db'); // connection to MongoDB;
const setupSwagger = require('./swagger/swagger');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.use('/contacts', contactRoutes);

// Swagger docs
setupSwagger(app);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
