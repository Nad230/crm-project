// routes/teamMemberRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTeamMembers,
  addTeamMember,
  updateTeamMemberLeads,
  deleteTeamMember,
  Role,
  getTeamMemberById,getreports,updateTeamMember,
  getsales
} = require('../controllers/teammemberController');

// Get all team members
router.get('/', getAllTeamMembers);
router.get('/get-team-member/:id', getTeamMemberById);
router.get('/lead-stats',getreports)
router.get('/sales-stats',getsales)

router.get('/role/:role',Role);


// Add a new team member
router.post('/addTeamMember', addTeamMember);

// Update a team member's assigned leads
router.put('/assign-leads/:id', updateTeamMemberLeads);

// Delete a team member
router.delete('/:id', deleteTeamMember);
router.put('/:id', updateTeamMember);

module.exports = router;
