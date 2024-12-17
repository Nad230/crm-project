// routes/adminAuth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) =>{
    const { username, password, email } = req.body;
s
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
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
