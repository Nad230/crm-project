const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  source: { type: String, required: true },
  companyName: { type: String, default: '' },
  photo: { type: String, default: '' }, // Added photo field
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Negotiation', 'Closed',"rejected"], default: 'New' },
  leadStage: { type: String, enum: ['Initial Contact', 'Follow-up', 'Negotiation'], default: 'Initial Contact' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember', required: true },
  notes: { type: String, default: '' },
  estimatedValue: { type: Number, default: null },
  description: { type: [String], default: [] }, // Corrected spelling
  history: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity'},
  customAttributes: { type: Map, of: String, default: {} }
});

module.exports = mongoose.model('Lead', leadSchema);
