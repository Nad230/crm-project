import React from "react";
import { Box, Typography, Grid, Card, CardContent, Divider } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Example data for chart visualization
const leadStatsData = {
  labels: ["New", "Qualified", "Closed", "Rejected"],
  datasets: [
    {
      label: "Lead Status",
      data: [12, 19, 5, 2], // Data for each lead status
      backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336"], // Colors for each status
    },
  ],
};

const salesStatsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales Growth",
      data: [30, 45, 60, 50, 70, 85], // Monthly sales growth data
      backgroundColor: "#2196f3",
      borderColor: "#1976d2",
      borderWidth: 1,
    },
  ],
};

const ReportsPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Reports
      </Typography>

      <Grid container spacing={4}>
        {/* Lead Stats */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Lead Status
            </Typography>
            <Doughnut data={leadStatsData} />
          </Card>
        </Grid>

        {/* Sales Growth */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Sales Growth (Monthly)
            </Typography>
            <Bar data={salesStatsData} />
          </Card>
        </Grid>
      </Grid>

      {/* Activity Timeline (Optional) */}
      <Box sx={{ marginTop: 4 }}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Activity Timeline (Last 7 Days)
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          {/* Here, you can add an actual timeline component */}
          <Typography variant="body1" color="text.secondary">
            - Call with Sarah Johnson on Dec 8th
          </Typography>
          <Typography variant="body1" color="text.secondary">
            - Meeting with John Doe on Dec 6th
          </Typography>
          <Typography variant="body1" color="text.secondary">
            - Follow-up with Alex Smith on Dec 5th
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default ReportsPage;
