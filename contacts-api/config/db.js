const mongoose = require('mongoose');
require('dotenv').config(); // to Load .env variables

mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Connection error:', err));

module.exports = mongoose;

