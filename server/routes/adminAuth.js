// routes/adminAuth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');const TeamMember = require("../models/teamMember");

const Admin = require('../models/Admin');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) =>{
    const { username, password, email } = req.body;

    // Validate required fields
    if (!username || !password || !email) {
        return res.status(400).json({ error: "Username, password, and email are required." });
    }

    try {
        // Check if username already exists
        const existingAdmin = await Admin.findOne({ username: username });
        if (existingAdmin) {
            return res.status(400).json({ error: "Username is already taken." });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new admin with hashed password
        const newAdmin = new Admin({ username, password: hashedPassword, email });
        
        // Save the admin to the database
        await newAdmin.save();

        // Send success response
        res.status(201).json({ message: "Admin registered successfully." });
    } catch (error) {
        console.error("Error while registering admin: ", error);
        res.status(500).json({ error: "An error occurred while registering the admin." });
    }
});


// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // Extract email and password from the request body

  try {
    // Find the team member by email
    const teamMember = await TeamMember.findOne({ email });
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, teamMember.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token (optional)
    const token = jwt.sign(
      { id: teamMember._id, email: teamMember.email, role: teamMember.role }, // Payload
      process.env.JWT_SECRET,  // Secret key for signing the JWT
      { expiresIn: '1h' }     // Token expiration time (e.g., 1 hour)
    );

    // Send the token and user info in the response
    res.status(200).json({
      message: 'Login successful',
      token,  // Send the token to the client
      teamMember: {              // Send user details without password
        fullName: teamMember.fullName,
        email: teamMember.email,
        role: teamMember.role,
        phone: teamMember.phone
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }

});

module.exports = router;
