const express = require('express');
const { connectDatabase } = require('./src/config/Database');
const Routes = require('./src/routes/Routes');
require('dotenv').config();

const app = express();


app.use(express.json());


connectDatabase();

// Use routes
app.use('/api', Routes);

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

