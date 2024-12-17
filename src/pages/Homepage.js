import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: `linear-gradient(to bottom, #1E2A38, #2A3F54)`,
        color: "#fff",
      }}
    >
      {/* Login Icon */}
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <IconButton
          color="inherit"
          onClick={() => navigate("/login")}
          aria-label="Login"
        >
          <LoginIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Our CRM Solution
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, maxWidth: "600px" }}>
          Our project is designed to help you manage leads, track team activities,
          and streamline your workflow with ease.
        </Typography>

        {/* Call-to-Action Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ paddingX: 4, borderRadius: "20px", fontWeight: "bold" }}
          onClick={() => navigate("/add-lead")}
        >
          Interested? Talk to Us!
        </Button>
      </motion.div>
    </Box>
  );
};

export default HomePage;
