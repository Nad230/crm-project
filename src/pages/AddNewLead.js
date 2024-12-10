import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Grid, Button, FormControl, Select, MenuItem, InputLabel, Fab } from "@mui/material";
import { Add, Search } from "@mui/icons-material";

const AddNewLead = () => {
  const navigate = useNavigate();

  const [newLead, setNewLead] = useState({
    fullName: "",
  email: "",
  phone: "",
  source: "",
  status: "New", // Changed to status for consistency with backend schema
  assignedTo: "Nadhir",
  priority: "High",
  followUpDate: "",
  estimatedValue: "",
  tags: "",
  });

  const [customers, setCustomers] = useState([]);

  // Fetch customer (users for "assignedTo" field) data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers"); // Adjust the API endpoint
        const data = await response.json();
        setCustomers(data); // Assuming the data returned contains users for assignment
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLead),
      });

      const data = await response.json();
      if (response.ok) {
        setCustomers((prevCustomers) => [...prevCustomers, data]); // Update the list of leads/customers
        navigate("/leads");
      } else {
        throw new Error(data.error || "There was an error adding the lead.");
      }
    } catch (error) {
      console.error("Error adding lead:", error);
      alert(error.message);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f0f4f8" }}>
      <Box sx={{ padding: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ color: "#3b82f6", fontWeight: "bold" }}>
          Add New Lead
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <form onSubmit={handleAddLead}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Full Name" // Changed to Full Name for consistency with backend
                name="fullName" // Changed to fullName to match backend
                value={newLead.fullName}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={newLead.email}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={newLead.phone}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Source"
                name="source"
                value={newLead.source}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}>
                <InputLabel>Lead Stage</InputLabel>
                <Select
                  label="Lead Stage"
                  name="leadStage" // changed to leadStage for backend validation
                  value={newLead.leadStage}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="Qualified">Qualified</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}>
                <InputLabel>Assigned To</InputLabel>
                <Select
                  label="Assigned To"
                  name="assignedTo"
                  value={newLead.assignedTo}
                  onChange={handleInputChange}
                  required
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.name}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  name="priority"
                  value={newLead.priority}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Follow-up Date"
                name="followUpDate"
                type="date"
                value={newLead.followUpDate}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Estimated Value"
                name="estimatedValue"
                value={newLead.estimatedValue}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tags"
                name="tags"
                value={newLead.tags}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" sx={{ background: "#3b82f6", color: "#ffffff" }}>
                Add Lead
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Fab
        color="secondary"
        onClick={() => navigate("/leads")}
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          background: "#3b82f6",
          color: "#ffffff",
          "&:hover": { background: "#1e3a8a" },
        }}
      >
        <Search />
      </Fab>
    </Box>
  );
};

export default AddNewLead;
