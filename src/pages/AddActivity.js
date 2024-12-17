import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Phone, VideoCall, MeetingRoom, AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const activityIcons = {
  Call: <Phone />,
  Meeting: <MeetingRoom />,
  VideoCall: <VideoCall />,
};

const AddActivityForm = () => {
  const [activityType, setActivityType] = useState("");
  const [description, setDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/team");
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    const fetchLeads = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leads");
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchTeamMembers();
    fetchLeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newActivity = {
      activityType,
      description,
      userId: selectedUserId,
      leadId: selectedLeadId,
      date,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/activities", newActivity);
      console.log("Activity added:", response.data);

      // Show success message
      setSuccessMessage(true);

      // Navigate to activities page after a delay
      setTimeout(() => {
        navigate("/activity"); // Replace "/activities" with the correct route for the activities page
      }, 2000);
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: "auto", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Add New Activity
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Activity Type</InputLabel>
            <Select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              label="Activity Type"
              startAdornment={<InputAdornment position="start">{activityIcons[activityType]}</InputAdornment>}
            >
              <MenuItem value="Call">Call</MenuItem>
              <MenuItem value="Meeting">Meeting</MenuItem>
              <MenuItem value="VideoCall">Video Call</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Team Member</InputLabel>
            <Select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              label="Team Member"
            >
              {teamMembers.map((member) => (
                <MenuItem key={member._id} value={member._id}>
                  {member.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Lead/Customer</InputLabel>
            <Select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              label="Lead/Customer"
            >
              {leads.map((lead) => (
                <MenuItem key={lead._id} value={lead._id}>
                  {lead.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Date"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
          <IconButton onClick={handleSubmit} color="primary" sx={{ backgroundColor: "#4caf50", color: "#fff", padding: 2 }}>
            <AddCircle fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: "100%" }}>
          Activity added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddActivityForm;
