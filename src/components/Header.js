import React, { useState } from "react";
import profileImage from "../images/projectcrm.jpg";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Notifications,
  AccountCircle,
  Brightness4,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For managing the profile menu
  const { logout } = useAuth(); // Access logout from AuthContext
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the profile menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the profile menu
  };

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to the login page
    setAnchorEl(null); // Close the menu after logout
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1e293b",
          boxShadow: "none",
          borderBottom: "2px solid #334155",
        }}
      >
        <Toolbar>
          {/* Hamburger Menu Before Title */}
          <IconButton color="inherit" onClick={toggleSidebar} sx={{ marginRight: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#ffffff" }}>
            MyCRM
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {["Home", "Dashboard", "Activity"].map((label, index) => (
              <NavLink
                key={index}
                to={`/${label.toLowerCase().replace(" ", "-")}`}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#38bdf8" : "#ffffff",
                  transition: "color 0.3s ease, transform 0.3s ease",
                })}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              >
                {label}
              </NavLink>
            ))}
          </Box>

          {/* Divider */}
          <Box sx={{ height: "40px", width: "2px", backgroundColor: "#6b7280", marginX: 2 }} />

          {/* Icons */}
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Brightness4 />
          </IconButton>

          {/* Profile Icon */}
          <IconButton color="inherit" onClick={handleMenuClick}>
            <AccountCircle />
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        PaperProps={{
          sx: {
            marginTop: "64px", // Matches the AppBar height
            height: "calc(100% - 64px)", // Adjust height to fill below AppBar
            backgroundColor: "#1e293b",
          },
        }}
      >
        <Box sx={{ width: 250, backgroundColor: "#1e293b", height: "100%", color: "#ffffff" }}>
          {/* Reserved Space for Photo */}
          <Box sx={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#334155" }}>
            <img src={profileImage} alt="Profile" style={{ height: "80px", borderRadius: "50%" }} />
          </Box>

          <List>
            {["add-activity", "Leads", "Reports", "Customer", "Add Customer", "TeamMember"].map((label, index) => (
              <ListItem button key={index}>
                <NavLink
                  to={`/${label.toLowerCase().replace(" ", "-")}`}
                  style={{
                    textDecoration: "none",
                    color: "#ffffff",
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                  onClick={toggleSidebar} // Close sidebar on click
                >
                  <ListItemText primary={label} />
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
