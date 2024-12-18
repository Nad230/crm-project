import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
  
} from "@mui/material";
import { Search, Info, Delete, AccountCircle } from "@mui/icons-material";

const LeadsPage = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { managerFullName } = useAuth(); // Manager's full name from context

  // Fetch leads from the backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/leads", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch leads");

        const data = await response.json();

        // Fetch team member info for each lead
        const leadsWithTeamInfo = await Promise.all(
          data.map(async (lead) => {
            if (lead.assignedTo) {
              try {
                const teamMemberResponse = await fetch(
                  `http://localhost:5000/api/team/get-team-member/${lead.assignedTo}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!teamMemberResponse.ok) {
                  throw new Error(
                    `Failed to fetch team member for ${lead.assignedTo}`
                  );
                }

                const teamMember = await teamMemberResponse.json();
                return { ...lead, assignedToName: teamMember.fullName };
              } catch (err) {
                console.error(
                  `Error fetching team member for lead ${lead._id}:`,
                  err.message
                );
                return { ...lead, assignedToName: "Not Found" };
              }
            }

            return { ...lead, assignedToName: "Not Assigned" };
          })
        );

        setLeads(leadsWithTeamInfo);
      } catch (error) {
        console.error("Error fetching leads:", error.message);
      }
    };

    fetchLeads();
  }, []);

  // Delete lead
  const handleDeleteLeads = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete lead");

      setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
    } catch (error) {
      console.error("Error deleting lead:", error.message);
    }
  };

  // Handle search input
  const handleSearch = (e) => setSearchQuery(e.target.value);

  // Filter leads based on search query and assigned manager name
  const filteredLeads = leads.filter((lead) => {
    const searchLower = searchQuery.toLowerCase();

    return (
      (lead.fullName?.toLowerCase().includes(searchLower) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.phone?.toLowerCase().includes(searchLower)) &&
      lead.assignedToName === managerFullName
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
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e3a8a" }}>
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
        {filteredLeads.length > 0 ? (
          <Grid container spacing={3}>
            {filteredLeads.map((lead) => (
              <Grid item xs={12} sm={6} md={4} key={lead._id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 4,
                    padding: 2,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <AccountCircle
                        sx={{ fontSize: 40, mr: 2, color: "#1e40af" }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {lead.fullName}
                      </Typography>
                    </Box>
                    <Typography>Email: {lead.email}</Typography>
                    <Typography>Phone: {lead.phone}</Typography>
                    <Typography>Source: {lead.source}</Typography>
                    <Typography
                      sx={{
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
                    <Typography>Assigned To: {lead.assignedToName}</Typography>
                    <Chip
                      label={lead.status}
                      sx={{
                        mt: 1,
                        backgroundColor:
                          lead.status === "New" ? "#e0f2fe" : "#ede9fe",
                        color: lead.status === "New" ? "#0ea5e9" : "#7c3aed",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <IconButton
                        sx={{ color: "#3b82f6" }}
                        onClick={() => navigate(`/lead/${lead._id}`)}
                      >
                        <Info />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteLeads(lead._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" textAlign="center" color="text.secondary">
            No leads available
          </Typography>
        )}
      </Box>

      {/* Floating Add Button */}
     
    </Box>
  );
};

export default LeadsPage;
