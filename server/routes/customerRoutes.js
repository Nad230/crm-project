// routes/customerRoutes.js
const express = require('express');
const router = express.Router(); // Initialize router
const { addCustomer } = require('../controllers/customerController'); // Import controller function

// POST route to add a customer
router.post('/addCustomer', addCustomer); // Call the controller function

module.exports = router; // Export router
