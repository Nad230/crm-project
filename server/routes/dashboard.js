// routes/dashboard.js
const express = require('express');
const router = express.Router();
const  Lead = require('../models/Lead'); // Import your models
const Customer = require('../models/Customer'); // Import your models


// Sample route to fetch dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    // Fetch total leads
    const totalLeads = await Lead.countDocuments();

    // Fetch active customers (e.g., customers with 'Active' status)
    const activeCustomers = await Customer.countDocuments();

    // Fetch revenue for the current month
    const revenue = await getRevenueThisMonth(); // Implement this function if necessary

    // Mock data for leads growth (replace with real data from DB if needed)
    const leadsGrowth = [10, 20, 30, 40, 50];

    // Send response with data
    res.json({
      totalLeads,
      activeCustomers,
      revenue,
      leadsGrowth,
    });
  } catch (error) {
    console.error('Error fetching dashboard data', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Helper function for calculating revenue (this is just an example)
const getRevenueThisMonth = async () => {
  // Example query to sum up the revenue for the current month
  const revenue = await Customer.aggregate([
    { $match: { createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
    { $group: { _id: null, total: { $sum: '$revenue' } } }
  ]);
  return revenue[0]?.total || 0; // Returns the total revenue for the month
};

module.exports = router;
