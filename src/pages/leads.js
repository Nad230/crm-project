import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  InputAdornment,
  Chip,
  Fab,
} from "@mui/material";
import { Search, Info, Delete, Add, AccountCircle } from "@mui/icons-material";

const LeadsPage = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleDeleteLeads = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "DELETE",
      });
      setLeads(leads.filter((lead) => lead._id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  // Fetch leads and team member names
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Fetch all leads
        const response = await fetch("http://localhost:5000/api/leads");
        const data = await response.json();

        // Map through leads and fetch assigned team member details
        const updatedLeads = await Promise.all(
          data.map(async (lead) => {
            if (lead.assignedTo) {
              try {
                const teamMemberResponse = await fetch(
                  `http://localhost:5000/api/team/get-team-member/${lead.assignedTo}`
                );
                const teamMember = await teamMemberResponse.json();
                return { ...lead, assignedToName: teamMember.fullName };
              } catch (error) {
                console.error("Error fetching team member:", error);
                return { ...lead, assignedToName: "Error fetching member" };
              }
            } else {
              return { ...lead, assignedToName: "Not Assigned" };
            }
          })
        );

        setLeads(updatedLeads);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredLeads = leads.filter((lead) => {
    const fullName = lead.fullName ? lead.fullName.toLowerCase() : "";
    const email = lead.email ? lead.email.toLowerCase() : "";
    const phone = lead.phone ? lead.phone.toLowerCase() : "";

    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase()) ||
      phone.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f4f8",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          padding: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
            fontWeight: "bold",
          }}
        >
          Leads
        </Typography>
        <TextField
          placeholder="Search leads..."
          variant="outlined"
          sx={{
            maxWidth: 400,
            backgroundColor: "#ffffff",
            borderRadius: 2,
          }}
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Leads Display */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 3 }}>
        <Grid container spacing={3}>
          {filteredLeads.map((lead) => (
            <Grid item xs={12} sm={6} md={4} key={lead._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: 4,
                  padding: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <AccountCircle sx={{ fontSize: 40, marginRight: 2, color: "#1e40af" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e293b" }}>
                      {lead.fullName}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Email: {lead.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {lead.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    Source: {lead.source}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: 1,
                      color:
                        lead.priority === "High"
                          ? "#ef4444"
                          : lead.priority === "Medium"
                          ? "#f59e0b"
                          : "#10b981",
                      fontWeight: "bold",
                    }}
                  >
                    Priority: {lead.priority}
                  </Typography>

                  {/* Display the name of the assigned person */}
                  <Typography variant="body2" color="text.secondary">
                    Assigned To: {lead.assignedToName}
                  </Typography>

                  <Chip
                    label={lead.status}
                    sx={{
                      backgroundColor: lead.status === "New" ? "#e0f2fe" : "#ede9fe",
                      color: lead.status === "New" ? "#0ea5e9" : "#7c3aed",
                      fontWeight: "bold",
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                    <IconButton
                      sx={{ color: "#3b82f6" }}
                      onClick={() => navigate(`/lead/${lead._id}`)}
                    >
                      <Info />
                    </IconButton>
                    <Button
                    
                    color="secondary"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteLeads(lead._id)}
                  >
                  </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Floating Add Button */}
      <Fab
        color="primary"
        onClick={() => navigate("/add-lead")}
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

export default LeadsPage;
