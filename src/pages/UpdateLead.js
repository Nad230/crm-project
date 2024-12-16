import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const UpdateLead = () => {
  const { id } = useParams(); // Get lead ID from URL params
  const navigate = useNavigate(); // For navigation

  const [leadData, setLeadData] = useState({
    status: "",
    assignedTo: "",
    leadStage: "",
    priority:"",
    notes: "",
  });

  const [teamMembers, setTeamMembers] = useState([]); // Store team members for the dropdown
  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const [loading, setLoading] = useState(true); // Initial loading state

  // Fetch lead data and team members
  useEffect(() => {
    const fetchLeadAndTeam = async () => {
      try {
        // Fetch the lead details
        const leadResponse = await fetch(`http://localhost:5000/api/leads/${id}`);
        const leadData = await leadResponse.json();

        // Fetch the team members (correct API URL)
        const teamResponse = await fetch(`http://localhost:5000/api/team`);
        const teamData = await teamResponse.json();

        if (teamData && Array.isArray(teamData)) {
          setTeamMembers(teamData); // Set team members
        } else {
          setErrorMessage("Failed to load team members.");
        }

        setLeadData(leadData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lead or team members:", error);
        setErrorMessage("Failed to load details. Please try again later.");
        setLoading(false);
      }
    };

    fetchLeadAndTeam();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeadData({ ...leadData, [name]: value });
  };

  // Handle lead update
  const handleUpdateLead = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      alert("Lead updated successfully!");
      navigate("/leads"); // Navigate to leads list after successful update
    } catch (error) {
      console.error("Error updating lead:", error);
      setErrorMessage("Error updating lead. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography sx={{ marginLeft: 2 }}>Loading lead details...</Typography>
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
        Update Lead
      </Typography>
      {errorMessage && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleUpdateLead}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={leadData.status}
            onChange={handleInputChange}
            label="Status"
            required
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Contacted">Contacted</MenuItem>
            <MenuItem value="Qualified">Qualified</MenuItem>
            <MenuItem value="Negotiation">Negotiation</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
       
        <FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>Priority</InputLabel>
  <Select
    name="priority"
    value={leadData.priority}
    onChange={handleInputChange}
    label="Priority"
    required
  >
    <MenuItem value="High">High</MenuItem>
    <MenuItem value="Medium">Medium</MenuItem>
    <MenuItem value="Low">Low</MenuItem>
  </Select>
</FormControl>


        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Assigned To</InputLabel>
          <Select
            name="assignedTo"
            value={leadData.assignedTo}
            onChange={handleInputChange}
            label="Assigned To"
            required
          >
            {teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  {member.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>No team members available</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Lead Stage</InputLabel>
          <Select
            name="leadStage"
            value={leadData.leadStage}
            onChange={handleInputChange}
            label="Lead Stage"
            required
          >
            <MenuItem value="Initial Contact">Initial Contact</MenuItem>
            <MenuItem value="Follow-up">Follow-up</MenuItem>
            <MenuItem value="Negotiation">Negotiation</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Notes"
          name="notes"
          value={leadData.notes}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

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
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              setLeadData({ status: "", assignedTo: "", leadStage: "",priority:"", notes: "" })
            }
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateLead;
