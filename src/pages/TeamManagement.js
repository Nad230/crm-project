import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Person, Email, Phone, Work } from '@mui/icons-material';
import axios from 'axios';

const AddTeamMember = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added success message state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure correct API endpoint
      const response = await axios.post('http://localhost:5000/api/team/addTeamMember', formData);

      // If the response is successful
      console.log('Team member added:', response.data);
      setSuccessMessage('Team member added successfully!');
      setErrorMessage(''); // Clear any previous error message

      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        role: '',
      });
    } catch (error) {
      console.error('Error adding team member:', error.response ? error.response.data : error.message);
      setErrorMessage('Error adding team member, please try again.');
      setSuccessMessage(''); // Clear success message
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: '',
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 4,
        borderRadius: 2,
        backgroundColor: '#f8fafc',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Add New Team Member
      </Typography>

      {/* Display Success Message */}
      {successMessage && <Typography color="success">{successMessage}</Typography>}

      {/* Display Error Message */}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton disabled>
            <Person />
          </IconButton>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton disabled>
            <Email />
          </IconButton>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton disabled>
            <Phone />
          </IconButton>
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton disabled>
            <Work />
          </IconButton>
          <FormControl fullWidth required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Sales Representative">Sales Representative</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit" // This triggers handleSubmit
            sx={{
              '&:hover': {
                backgroundColor: '#2563eb',
              },
            }}
          >
            Save
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset} // Reset form fields
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTeamMember;
