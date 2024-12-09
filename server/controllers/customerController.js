// controllers/customerController.js
const Customer = require('../models/Customer'); // Ensure the path is correct

// Controller function to add a new customer
exports.addCustomer = async (req, res) => {
  const { name, email, phone, company, Additional_Notes, status } = req.body;

  try {
    const newCustomer = await Customer.create({
      name,
      email,
      phone,
      company,
      Additional_Notes,
      status,
    });

    res.status(201).json({ message: 'Customer added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding customer', error });
    console.log(error);
  }
};
