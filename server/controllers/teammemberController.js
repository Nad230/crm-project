const TeamMember = require('../models/teamMember');
const Lead = require('../models/Lead'); 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');




// Route: GET /api/sales-stats
const getsales = async (req, res) => {
  try {
    // Aggregate the total estimated value of closed leads, grouped by month
    const salesByMonth = await Lead.aggregate([
      {
        $match: { status: 'Closed' } // Filter only closed leads
      },
      {
        $group: {
          _id: { $month: "$followUpDate" }, // Group by the month of 'followUpDate'
          monthlyTotal: { $sum: { $ifNull: ["$estimatedValue", 0] } } // Sum 'estimatedValue', default to 0
        }
      },
      {
        $sort: { "_id": 1 } // Sort by month in ascending order
      }
    ]);

    // Calculate the overall total for closed leads
    const overallTotalResult = await Lead.aggregate([
      {
        $match: { status: 'Closed' } // Filter only closed leads
      },
      {
        $group: {
          _id: null, // No grouping key
          totalEstimatedValue: { $sum: { $ifNull: ["$estimatedValue", 0] } }
        }
      }
    ]);

    const overallTotal = overallTotalResult.length > 0 ? overallTotalResult[0].totalEstimatedValue : 0;

    // Calculate revenue for the current month
    const currentMonthRevenueResult = await Lead.aggregate([
      {
        $match: {
          status: 'Closed',
          $expr: { $eq: [{ $month: "$followUpDate" }, new Date().getMonth() + 1] } // Current month
        }
      },
      {
        $group: {
          _id: null,
          monthlyRevenue: { $sum: { $ifNull: ["$estimatedValue", 0] } }
        }
      }
    ]);

    const monthlyRevenue = currentMonthRevenueResult.length > 0 ? currentMonthRevenueResult[0].monthlyRevenue : 0;

    // Prepare labels and values for the last 6 months
    const currentDate = new Date();
    const labels = [];
    const values = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = date.getMonth() + 1; // Months are 1-indexed in the output
      const monthLabel = date.toLocaleString('default', { month: 'short' });

      labels.push(monthLabel);

      // Find the sales for this month (only closed leads)
      const sale = salesByMonth.find(s => s._id === month);
      values.push(sale ? sale.monthlyTotal : 0);
    }

    // Send the response with monthly revenue
    res.json({
      labels,
      values,
      totalEstimatedValue: overallTotal,
      monthlyRevenue: monthlyRevenue, // Add monthly revenue to the response
    });
  } catch (error) {
    console.error("Error fetching sales stats:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getreports= async (req, res) => {
  try {
    // Aggregate data based on lead status
    const leadStats = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Map the response to fit the frontend data format
    const stats = leadStats.reduce((acc, { _id, count }) => {
      if (_id === "New") acc.new = count;
      else if (_id === "Qualified") acc.qualified = count;
      else if (_id === "Closed") acc.closed = count;
      else if (_id === "Rejected") acc.rejected = count;
      return acc;
    }, { new: 0, qualified: 0, closed: 0, rejected: 0 });

    res.json(stats); // Send stats back to the frontend
  } catch (error) {
    console.error("Error fetching lead stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTeamMemberById = async (req, res) => {
    const MemberId = req.params.id; // Fetch user ID from the URL parameter
    try {
      const member = await TeamMember.findById(MemberId); // Find user by ID
      if (!member) {
        return res.status(404).send("User not found");
      }
      res.json(member); // Send the user data as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };
  

// Add a new team member
const addTeamMember = async (req, res) => {
  try {
    const { fullName, email, role, phone, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10 is commonly used

    // Create a new TeamMember document
    const newMember = new TeamMember({
      fullName,
      email,
      role,
      phone,
      password: hashedPassword, // Save the hashed password
    });

    // Save the new member to the database
    await newMember.save();

    // Return the created team member (excluding password)
    const memberResponse = { ...newMember._doc };
    delete memberResponse.password; // Remove password field before sending response

    res.status(201).json(memberResponse); // Respond with the created member (without password)
  } catch (err) {
    console.error('Error adding team member:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update a team member's assigned leads
const updateTeamMemberLeads = async (req, res) => {
  try {
    const { assignedLeads } = req.body; // Array of lead IDs
    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { $push: { assignedLeads: { $each: assignedLeads } } },
      { new: true }
    );
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a team member
const deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Role = async (req, res) => {
    try {
        const { role } = req.params;
        const teamMembers = await TeamMember.find({ role: role });
        
        if (teamMembers.length === 0) {
          return res.status(404).json({ message: "No team members found with this role" });
        }
        
        res.json(teamMembers);
      } catch (error) {
        console.error("Error fetching team members by role:", error);
        res.status(500).json({ message: "Server error" });
      }
    };
    const updateTeamMember = async (req, res) => {
      try {
        const { fullName, email, role, phone } = req.body; // Extract fields to update from request body
        const updatedMember = await TeamMember.findByIdAndUpdate(
          req.params.id,
          { fullName, email, role, phone }, // Update these fields
          { new: true, runValidators: true } // Return the updated document and run validation
        );
    
        if (!updatedMember) {
          return res.status(404).json({ message: "Team member not found" });
        }
    
        res.json(updatedMember);
      } catch (err) {
        console.error("Error updating team member:", err);
        res.status(500).json({ error: "Server error" });
      }
    };

// Get team members by role
module.exports = {
    getAllTeamMembers,
    addTeamMember,
    updateTeamMemberLeads,
    deleteTeamMember,
    Role,
    getTeamMemberById ,
    getreports,
    updateTeamMember,getsales
  };