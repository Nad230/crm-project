import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Person, Email, Phone, Business, Note } from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCustomer = () => {
  const { id } = useParams(); // Get customer ID from URL params
  const navigate = useNavigate(); // For navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    notes: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customer/${id}`);
        setFormData(response.data); // Populate form with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer:", error.response ? error.response.data : error.message);
        setErrorMessage("Failed to load customer details. Please try again later.");
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/customer/${id}`,
        formData
      );
      console.log("Customer updated successfully:", response.data);
      alert("Customer updated successfully!");
      navigate("/customer");  // Redirect to customer list
    } catch (error) {
      console.error("Error updating customer:", error.response ? error.response.data : error.message);
      setErrorMessage("Error updating customer. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
      notes: "",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography sx={{ marginLeft: 2 }}>Loading customer details...</Typography>
      </Box>
    );
  }

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 4,
        borderRadius: 2,
        backgroundColor: "#f8fafc",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Update Customer
      </Typography>
      {errorMessage && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton disabled>
            <Person />
          </IconButton>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton disabled>
            <Business />
          </IconButton>
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton disabled>
            <Note />
          </IconButton>
          <TextField
            label="Additional Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            }}
          >
            Update
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateCustomer;
