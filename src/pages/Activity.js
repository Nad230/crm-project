import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const ActivityTimeline = () => {
  const activities = [
    { time: "10:00 AM", action: "Call with John", type: "Call" },
    { time: "1:00 PM", action: "Email sent to Sarah", type: "Email" },
    { time: "3:00 PM", action: "Updated customer details", type: "Update" },
  ];

  return (
   
   
  
    <Box sx={{ padding: 2, backgroundColor: "#f8fafc", borderRadius: "8px" }}>
        
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Activity Timeline
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <Box key={index}>
            <ListItem sx={{ paddingLeft: 0 }}>
              <AccessTime sx={{ color: "#38bdf8", marginRight: 1 }} />
              <ListItemText
                primary={`${activity.time} - ${activity.action}`}
                secondary={activity.type}
              />
            </ListItem>
            {index < activities.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ActivityTimeline;
