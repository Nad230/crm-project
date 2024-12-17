const Lead = require("../models/Lead");
const TeamMember = require("../models/teamMember");
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint to handle file upload
// File Upload Route FIRST
const postphoto= async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return the file path
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// THEN Dynamic Routes


// Create a new lead
const createLead = async (req, res) => {
  const { fullName, email, phone, source, description, photo } = req.body;

  try {
    // Find the Sales Representative
    const salesRep = await TeamMember.findOne({ role: "Sales Representative" });

    // Create the new lead
    const newLead = new Lead({
      fullName,
      email,
      phone,
      source,
      photo, // Include the photo field
      status: "New",
      assignedTo: salesRep._id, // Automatically assign to Sales Representative
      notes: description,
    });

    // Save the new lead
    await newLead.save();

    // Add the lead's ID to the Sales Representative's 'assignedLeads' array
    salesRep.assignedLeads.push(newLead._id);

    // Save the updated Sales Representative
    await salesRep.save();

    // Respond with the newly created lead
    res.status(201).json(newLead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Get the most recent leads
const getRecentLeads = async (req, res) => {
    try {
      const recentLeads = await Lead.find()
        .sort({ lastModified: -1 }) // Sort by lastModified in descending order (most recent first)
        .limit(5); // You can change the limit if needed
  
      if (!recentLeads || recentLeads.length === 0) {
        return res.status(404).json({ message: "No recent leads found." });
      }
  
      res.status(200).json(recentLeads);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


// Update lead's status and assignment
const updateLead = async (req, res) => {
  const { status, assignedTo, notes ,leadStage,priority} = req.body;

  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) return res.status(404).json({ error: "Lead not found" });

    lead.status = status || lead.status;
    
    lead.assignedTo = assignedTo || lead.assignedTo;
    lead.leadStage = leadStage || lead.leadStage;
    lead.priority = priority || lead.priority;
    if (notes) lead.notes.push(notes); // Log notes in history

    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific lead by ID
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "fullName"
    ); // Populate only the assignedTo fullName field

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.status(200).json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createLead,
  updateLead,
  getLeads,
  getLeadById,
  deleteLead,
  getRecentLeads,postphoto,storage
};
