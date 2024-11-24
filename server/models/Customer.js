const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },  // Optional field
  Additional_Notes: { type: String },  // Optional field
  status: { type: String, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
