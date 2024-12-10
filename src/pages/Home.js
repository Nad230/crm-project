import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Phone, Mail, Group, Edit } from "@mui/icons-material";
import ActivityTimeline from "./Activity"; // Assuming ActivityTimeline is defined earlier
import { Link } from "react-router-dom"; // For navigation to customer or lead details

// Example list of recent leads or customers
const recentLeads = [
  { name: "Sarah Johnson", status: "Follow-up", lastModified: "2024-12-08", id: 1 },
  { name: "John Doe", status: "Qualified", lastModified: "2024-12-06", id: 2 },
  { name: "Alex Smith", status: "New", lastModified: "2024-12-05", id: 3 },
];

const HomePage = () => {
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
              {recentLeads.map((lead) => (
                <Box
                  key={lead.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Box>
                    <Typography variant="body1">{lead.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {lead.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last Modified: {lead.lastModified}
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    to={`/lead/${lead.id}`} // You can create a route for detailed lead/customer
                    variant="contained"
                    color="primary"
                    sx={{ alignSelf: "center" }}
                  >
                    <Edit sx={{ marginRight: 1 }} />
                    View
                  </Button>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
