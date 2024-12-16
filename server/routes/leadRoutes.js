const express = require("express");
const {
  createLead,
  updateLead,
  getLeads,
  getLeadById,
  deleteLead,getRecentLeads
} = require("../controllers/leadController");

const router = express.Router();

// Create a new lead
router.post("/", createLead);

// Update lead's status and assignment
router.put("/:id", updateLead);
router.get("/recent", getRecentLeads);
// Get all leads
router.get("/", getLeads);

// Get a specific lead by ID
router.get("/:id", getLeadById);

// Delete a lead
router.delete("/:id", deleteLead);

module.exports = router;
