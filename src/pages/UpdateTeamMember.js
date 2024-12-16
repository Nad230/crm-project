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
import { Person, Email, Phone, Business } from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTeamMember = () => {
  const { id } = useParams(); // Get team member ID
  const navigate = useNavigate(); // For navigation

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
  });

  const [initialData, setInitialData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/team/get-team-member/${id}`);
        setFormData(response.data);
        setInitialData(response.data); // Store initial data for resetting
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team member:", error);
        setErrorMessage("Failed to load team member details.");
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/team/${id}`,
        formData
      );
      alert("Team member updated successfully!");
      navigate("/teammember");
    } catch (error) {
      console.error("Error updating team member:", error);
      setErrorMessage("Error updating team member. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData(initialData);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography>Loading team member details...</Typography>
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
        Update Team Member
      </Typography>
      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" type="submit">
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

export default UpdateTeamMember;
