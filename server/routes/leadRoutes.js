// routes/leadRoutes.js

const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();

// Create a new lead
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      source,
      companyName,
      status,
      leadStage,
      priority,
      assignedTo,
      notes,
      followUpDate,
      estimatedValue,
      tags,
      history,
      customAttributes
    } = req.body;

    // Create a new lead with the provided data
    const newLead = new Lead({
      fullName,
      email,
      phone,
      source,
      companyName,
      status,
      leadStage,
      priority,
      assignedTo,
      notes,
      followUpDate,
      estimatedValue,
      tags,
      history,
      customAttributes
    });

    // Save the new lead to the database
    await newLead.save();

    // Return the newly created lead as a response
    res.status(201).json(newLead);
  } catch (error) {
    // Return error message if something goes wrong
    res.status(400).json({ error: error.message });
  }
});
// Get all leads
// Get all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific lead by ID
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Update a lead
router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a lead
router.delete("/:id", async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;