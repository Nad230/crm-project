const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  source: { type: String, required: true },
  photo: { type: String, default: '' }, // Added photo field
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Negotiation', 'Closed', "Rejected"], default: 'New' },
  leadStage: { type: String, enum: ['Initial Contact', 'Follow-up', 'Negotiation'], default: 'Initial Contact' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember'},
  notes: { type: [String], default: [] },  // Make sure this is an array of strings
  estimatedValue: { type: Number, default: null },
  description: { type: [String], default: [] }, // Corrected spelling
  customAttributes: { type: Map, of: String, default: {} },
  
  // Add followUpDate field here
  followUpDate: { type: Date }  // Add follow-up date field
});

module.exports = mongoose.model('Lead', leadSchema);
