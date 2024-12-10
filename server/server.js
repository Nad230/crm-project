// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const leadRoutes = require("./routes/leadRoutes")
const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/project_crm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Use Routes
app.use('/api/customer', customerRoutes);
app.use('/api/leads', leadRoutes);
// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
