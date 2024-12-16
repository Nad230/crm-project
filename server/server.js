// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const leadRoutes = require("./routes/leadRoutes")
const teamRoutes = require('./routes/team')
const Reports = require('./routes/reports')
const activityRoutes = require('./routes/Activity');
const dashboardRoute = require('./routes/dashboard');
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


app.use('/api', dashboardRoute);
app.use('/api/customer', customerRoutes);
app.use('/api/leads', leadRoutes);
app.use('api/reportes',Reports)
app.use('/api',activityRoutes);
app.use('/api/team', teamRoutes);
app.get('/api/dashboard', async (req, res) => {
  try {
    // Fetch data from your database
    const totalLeads = await Lead.countDocuments();
    const activeCustomers = await Customer.countDocuments();
    const revenue = await getRevenueThisMonth(); // Example function to calculate revenue
    const leadsGrowth = await getLeadsGrowthData(); // Example function to get leads growth over time

    res.json({
      totalLeads,
      activeCustomers,
      revenue,
      leadsGrowth,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
