const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');

connectToMongo(); // Connect to MongoDB

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request body

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start Server (Always after middleware and routes)
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));





app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})