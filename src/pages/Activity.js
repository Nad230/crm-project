import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import axios from "axios";

const ActivityTimeline = () => {
  const [activities, setActivities] = useState([]);

  // Fetch activities from the backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/activities"); // Adjust the API endpoint as needed
        setActivities(response.data); // Assuming the response is an array of activity objects
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f8fafc", borderRadius: "8px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Activity Timeline
      </Typography>
      <List>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <Box key={index}>
              <ListItem sx={{ paddingLeft: 0 }}>
                <AccessTime sx={{ color: "#38bdf8", marginRight: 1 }} />
                <ListItemText
                  primary={`${new Date(activity.date).toLocaleTimeString()} - ${activity.description}`}
                  secondary={activity.activityType}
                />
              </ListItem>
              {index < activities.length - 1 && <Divider />}
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ textAlign: "center", color: "#6b7280" }}>
            No activities found.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default ActivityTimeline;
