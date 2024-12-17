const express = require("express");
const {
  createLead,
  updateLead,
  getLeads,
  getLeadById,
  deleteLead,
  getRecentLeads,
  postphoto,
} = require("../controllers/leadController");

const { storage } = require("../controllers/leadController"); // Import storage for multer
const multer = require("multer");
const router = express.Router();

// Configure Multer
const upload = multer({ storage });

// File Upload Route
router.post("/upload-photo", upload.single("photo"), postphoto);

// Create a new lead
router.post("/", createLead);

// Update lead's status and assignment
router.put("/:id", updateLead);

// Get the most recent leads
router.get("/recent", getRecentLeads);

// Get all leads
router.get("/", getLeads);

// Get a specific lead by ID
router.get("/:id", getLeadById);

// Delete a lead
router.delete("/:id", deleteLead);

module.exports = router;
