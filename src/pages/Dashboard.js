import React from 'react';
import { Box, Grid, Typography, Card, CardContent, IconButton } from '@mui/material';
import { BarChart, People, AccountBalance } from '@mui/icons-material';
import { Line } from 'react-chartjs-2'; // Assuming you're using chart.js for charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components (only once)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Leads Growth',
        data: [10, 20, 30, 40, 50],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f3f4f6' }}>
      {/* Dashboard Title */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#1e293b', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Leads</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>120</Typography>
            </CardContent>
            <IconButton sx={{ color: '#38bdf8' }}>
              <People />
            </IconButton>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#1e293b', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Active Customers</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>75</Typography>
            </CardContent>
            <IconButton sx={{ color: '#38bdf8' }}>
              <AccountBalance />
            </IconButton>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#1e293b', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Revenue This Month</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>$12,300</Typography>
            </CardContent>
            <IconButton sx={{ color: '#38bdf8' }}>
              <BarChart />
            </IconButton>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Box sx={{ mt: 4, backgroundColor: 'white', p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#1e293b' }}>
          Leads Growth Over Time
        </Typography>
        <Line data={data} options={{ responsive: true }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
