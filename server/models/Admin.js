    // models/Admin.js
    const mongoose = require('mongoose');

    const adminSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,  // Make sure it's required to avoid null values
        },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    });

    const Admin = mongoose.model('Admin', adminSchema);

    module.exports = Admin;
