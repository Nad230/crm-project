const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  role: String,
  phone: String,
  password: { type: String, required: true }, // Add password field

  assignedLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }],
});



const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
