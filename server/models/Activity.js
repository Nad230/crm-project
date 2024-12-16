// models/activity.js

const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  activityType: {
    type: String,
    enum: ["Call", "Meeting", "Follow-up"], // You can expand this list as needed
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teamMember", // Reference to the user who performed the activity
    required: true,
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead", // Reference to the lead or candidate
  },
});

module.exports = mongoose.model("Activity", activitySchema);
