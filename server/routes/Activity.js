// routes/activityRoutes.js

const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

// Route to create a new activity
router.post("/activities", activityController.createActivity);

// Route to get activities for a specific user
router.get("/activities/user/:userId", activityController.getActivitiesForUser);

// Route to get all activities (for admin)
router.get("/activities", activityController.getAllActivities);

module.exports = router;
