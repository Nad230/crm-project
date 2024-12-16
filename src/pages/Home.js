import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, Button, CircularProgress } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom"; // For navigation to customer or lead details
import axios from "axios"; // Import axios for API calls

import ActivityTimeline from "./Activity"; // Assuming ActivityTimeline is defined earlier

const HomePage = () => {
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch recent leads on component mount
  useEffect(() => {
    const fetchRecentLeads = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leads/recent");
        setRecentLeads(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recent leads:", error);
        setErrorMessage("Failed to load recent leads. Please try again.");
        setLoading(false);
      }
    };

    fetchRecentLeads();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography sx={{ marginLeft: 2 }}>Loading recent leads...</Typography>
      </Box>
    );
  }

  // Handle error message if there is one
  if (errorMessage) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Typography color="error">{errorMessage}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Welcome
      </Typography>

      
        <Grid container spacing={4}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Recent Activities
            </Typography>
            <ActivityTimeline />
          </Card>
        </Grid>

        {/* Recent Leads/Customers */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Recent Leads/Customers
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <Box
                    key={lead._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <Box>
                      <Typography variant="body1">{lead.fullName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {lead.status}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last Modified: {new Date(lead.lastModified).toLocaleString()}
                      </Typography>
                    </Box>
                    <Button
                      component={Link}
                      to={`/lead/${lead._id}`} // Link to detailed lead/customer page
                      variant="contained"
                      color="primary"
                      sx={{ alignSelf: "center" }}
                    >
                      <Edit sx={{ marginRight: 1 }} />
                      View
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">No recent leads to show</Typography>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;











