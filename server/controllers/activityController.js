// controllers/activityController.js

const Activity = require("../models/Activity");
const TeamMember = require('../models/teamMember'); // Correct import path
// Assuming you have a User model
const Lead = require("../models/Lead"); // Assuming you have a Lead model

// Create a new activity
const createActivity = async (req, res) => {
  try {
    const { activityType, description, date, userId, leadId } = req.body;

    const newActivity = new Activity({
      activityType,
      description,
      date,
      userId,
      leadId,
    });

    await newActivity.save();
    res.status(201).json({ message: "Activity created successfully", activity: newActivity });
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all activities for a user
const getActivitiesForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed as a route parameter
    const activities = await Activity.find({ userId }).populate("userId leadId", "name email title");
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all activities (for admin or reports)
// Get all activities
const getAllActivities = async (req, res) => {
    try {
      const activities = await Activity.find()
          // Ensure 'userId' references 'TeamMember'
        .populate('leadId', 'name'); // Ensure 'leadId' references 'Lead'
  
      if (!activities) {
        return res.status(404).json({ message: 'No activities found' });
      }
  
      res.json(activities); // Send the activities in the response
    } catch (err) {
      console.error('Error fetching activities:', err);
      res.status(500).json({
        message: 'Error fetching activities',
        error: err.message || err,
      });
    }
  };
  
  


module.exports = { createActivity, getActivitiesForUser, getAllActivities };
