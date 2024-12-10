import React from "react";
import { Box, Typography, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

const NotificationPanel = () => {
  const notifications = [
    { message: "Follow-up with Sarah about the contract.", time: "1 hour ago" },
    { message: "Lead update: John is interested in a demo.", time: "3 hours ago" },
    { message: "Task: Review customer feedback for product improvements.", time: "1 day ago" },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f8fafc", borderRadius: "8px", width: "300px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <Box key={index}>
            <ListItem sx={{ paddingLeft: 0 }}>
              <ListItemText
                primary={notification.message}
                secondary={notification.time}
              />
            </ListItem>
            {index < notifications.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <IconButton color="primary">
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NotificationPanel;
