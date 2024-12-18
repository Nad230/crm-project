import React, { useState, useEffect } from "react";
import Axios from "axios"
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fab,
} from "@mui/material";
import { Delete, Edit,Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate




/*const sampleCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "234-567-8901",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "345-678-9012",
    status: "Active",
  },
  // Add more sample customers as needed
];*/

const Customer = () => {
  const [customers,setCustomers]= useState([])

useEffect(()=>{
  Axios.get("http://localhost:5000/api/customer")
  .then(res =>{
    setCustomers(res.data)
  })
},[])
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Handle Search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter customers by status
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Clear search and status filter
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
  };
  const handleDeleteCustomer = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/customer/${id}`, {
        method: "DELETE",
      });
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Filtered customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter ? customer.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      {/* Search Bar and Filter */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search Customer (Name, Email, Phone)"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, email, or phone"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleFilterChange}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>


      {/* Customer List Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ marginRight: 1 }}
                    startIcon={<Edit />}
                    onClick={() => navigate(`/updateCustomer/${customer._id}`)} // Navigate to UpdateCustomer
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteCustomer(customer._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        color="primary"
        onClick={() => navigate("/add-customer")}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "linear-gradient(90deg, #3b82f6, #1e3a8a)",
          color: "#ffffff",
          "&:hover": { background: "linear-gradient(90deg, #1e3a8a, #3b82f6)" },
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default Customer;
