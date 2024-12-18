import React, { useState } from "react";
import profileImage from "../images/projectcrm.jpg";
import { useNavigate } from "react-router-dom";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, role } = useAuth(); // Access role from AuthContext instead of user
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
    setAnchorEl(null);
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
          <IconButton color="inherit" onClick={toggleSidebar} sx={{ marginRight: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#ffffff" }}>
            MyCRM
          </Typography>

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

          <Box sx={{ height: "40px", width: "2px", backgroundColor: "#6b7280", marginX: 2 }} />

          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Brightness4 />
          </IconButton>

          <IconButton color="inherit" onClick={handleMenuClick}>
            <AccountCircle />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        PaperProps={{
          sx: {
            marginTop: "64px",
            height: "calc(100% - 64px)",
            backgroundColor: "#1e293b",
          },
        }}
      >
        <Box sx={{ width: 250, backgroundColor: "#1e293b", height: "100%", color: "#ffffff" }}>
          <Box sx={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#334155" }}>
            <img src={profileImage} alt="Profile" style={{ height: "80px", borderRadius: "50%" }} />
          </Box>

          <List>
            {["add-activity", "Leads", "Reports", "Customer"].map((label, index) => (
              <ListItem button key={index}>
                <NavLink
                  to={`/${label.toLowerCase().replace(" ", "-")}`}
                  style={{
                    textDecoration: "none",
                    color: "#ffffff",
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                  onClick={toggleSidebar}
                >
                  <ListItemText primary={label} />
                </NavLink>
              </ListItem>
            ))}

            {/* Conditionally render the TeamMember link if the user is an admin */}
            {role && role.toLowerCase() === "admin" && (
              <ListItem button>
                <NavLink
                  to="/teammember"
                  style={{
                    textDecoration: "none",
                    color: "#ffffff",
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                  onClick={toggleSidebar}
                >
                  <ListItemText primary="TeamMember" />
                </NavLink>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
