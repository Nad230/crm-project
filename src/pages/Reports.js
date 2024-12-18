import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, Divider } from "@mui/material";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ReportsPage = () => {
  const [leadStats, setLeadStats] = useState({});
  const [salesStats, setSalesStats] = useState([]);  // Store sales stats data
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState({});
  const [leads, setLeads] = useState({});

  // Fetch lead stats from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/team/lead-stats')
      .then((response) => {
        console.log("Lead Stats Response:", response.data);
        setLeadStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lead stats:", error);
      });
  }, []);

  // Fetch sales stats for the sales growth chart
  useEffect(() => {
    axios.get('http://localhost:5000/api/team/sales-stats')
      .then((response) => {
        console.log("Sales Stats Response:", response.data);
        setSalesStats(response.data.values);  // Store sales data (monthly)
      })
      .catch((error) => {
        console.error("Error fetching sales stats:", error);
      });
  }, []);

  // Fetch activities for the activity timeline
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities') // Adjust the URL based on your endpoint
      .then((response) => {
        console.log("Activities Response:", response.data);
        setActivities(response.data);
        // Fetch users and leads once activities are fetched
        const userIds = response.data.map(activity => activity.userId);
        const leadIds = response.data.map(activity => activity.leadId);

        // Fetch user details
        axios.get('http://localhost:5000/api/team', { params: { ids: userIds } })
          .then((userResponse) => {
            const userMap = userResponse.data.reduce((map, user) => {
              map[user._id] = user.name;
              return map;
            }, {});
            setUsers(userMap);
          });

        // Fetch lead details
        axios.get('http://localhost:5000/api/leads', { params: { ids: leadIds } })
          .then((leadResponse) => {
            const leadMap = leadResponse.data.reduce((map, lead) => {
              map[lead._id] = lead.name;
              return map;
            }, {});
            setLeads(leadMap);
          });
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  // Ensure that the data is an array of numbers and handle possible 0, null, or undefined
  const newLeads = leadStats.new && !isNaN(leadStats.new) ? leadStats.new : 0;
  const qualifiedLeads = leadStats.qualified && !isNaN(leadStats.qualified) ? leadStats.qualified : 0;
  const closedLeads = leadStats.closed && !isNaN(leadStats.closed) ? leadStats.closed : 0;
  const rejectedLeads = leadStats.rejected && !isNaN(leadStats.rejected) ? leadStats.rejected : 0;

  // Data for the Lead Status Doughnut chart
  const leadStatsData = {
    labels: ["New", "Qualified", "Closed", "Rejected"],
    datasets: [
      {
        label: "Lead Status",
        data: [newLeads, qualifiedLeads, closedLeads, rejectedLeads],
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  // Data for the Sales Growth Bar chart
  const salesStatsData = {
    labels: ["Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],  // Months (or labels)
    datasets: [
      {
        label: "Sales Growth",
        data: salesStats,  // Map sales data to monthly stats
        backgroundColor: "#2196f3",
        borderColor: "#1976d2",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
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
            <Doughnut 
              data={leadStatsData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                elements: {
                  arc: {
                    borderWidth: 1,
                  },
                },
              }}
            />
          </Card>
        </Grid>

        {/* Sales Growth */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Sales Growth (Monthly)
            </Typography>
            <Bar data={salesStatsData} options={{ responsive: true }} />
          </Card>
        </Grid>
      </Grid>

      {/* Activity Timeline */}
      <Box sx={{ marginTop: 4 }}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Activity Timeline (Last 7 Days)
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          {activities.length > 0 ? (
            activities.map((activity) => (
              <Typography key={activity._id} variant="body1" color="text.secondary">
                {`${new Date(activity.date).toLocaleTimeString()} - ${activity.description}`}
              </Typography>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No recent activities to display.
            </Typography>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default ReportsPage;
