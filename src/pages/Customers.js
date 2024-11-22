// src/pages/Customers.js
import React from 'react';
import { Grid } from '@mui/material';
import CustomerCard from '../components/CustomerCard';

const Customers = () => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer.id}>
            <CustomerCard customer={customer} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Customers;
