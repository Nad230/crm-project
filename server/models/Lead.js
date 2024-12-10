const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  source: { type: String, required: true },
  companyName: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Closed', 'Inactive'], },
  leadStage: { type: String, enum: ['Initial Contact', 'Follow-up', 'Negotiation'], default: '' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'],  },
  assignedTo: { type: String,  },
  notes: { type: String, default: '' },
  followUpDate: { type: Date, default: null },
  estimatedValue: { type: Number, default: null },
  tags: { type: [String], default: [] },
  history: { type: [String], default: [] },
  customAttributes: { type: Map, of: String, default: {} }
});

module.exports = mongoose.model('Lead', leadSchema);
