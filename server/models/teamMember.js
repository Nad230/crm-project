const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  role: String,
  phone: String,
  assignedLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }],
});

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
