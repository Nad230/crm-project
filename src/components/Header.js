import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Notifications, AccountCircle, Brightness4 } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e293b",
        boxShadow: "none",
        borderBottom: "2px solid #334155",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#ffffff" }}
        >
          MyCRM
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {["Home","Dashboard", "Leads", "Reports", "Customer", "Add Customer", "Customer Details","Settings"].map((label, index) => (
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

        {/* Animated Divider */}
        <Box
          sx={{
            height: "40px",
            width: "2px",
            backgroundColor: "#6b7280",
            marginX: 2,
            opacity: 0,
            animation: "fadeIn 0.5s forwards",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        />

        {/* Icons */}
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <IconButton color="inherit">
          <Brightness4 />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
