// src/pages/AddCustomer.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to backend (Express API)
    console.log('Customer Added:', { name, email });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Customer
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Customer Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Customer Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Customer
        </Button>
      </form>
    </Container>
  );
};

export default AddCustomer;
