import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, Chat, ArrowBack, AddCircle } from "@mui/icons-material";
import { motion } from "framer-motion";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [note, setNote] = useState(""); // State for note text

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/leads/${id}`);
        const data = await response.json();

        if (data.assignedTo) {
          try {
            const teamMemberResponse = await fetch(
              `http://localhost:5000/api/team/get-team-member/${data.assignedTo}`
            );
            const teamMember = await teamMemberResponse.json();
            data.assignedToName = teamMember.fullName;
          } catch (error) {
            console.error("Error fetching assigned team member:", error);
            data.assignedToName = "Error fetching member";
          }
        } else {
          data.assignedToName = "Not Assigned";
        }

        setLead(data);
      } catch (error) {
        console.error("Error fetching lead details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [id]);

  const handleAddNote = async () => {
    if (note.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost:5000/api/leads/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              notes: note,
            }),
          }
        );

        const updatedLead = await response.json();
        setLead(updatedLead); // Update the lead with the new note
        setNote(""); // Clear the note input field
        setOpenDialog(false); // Close the dialog
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: 5 }}>
        Loading lead details...
      </Typography>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          padding: 3,
          maxWidth: 600,
          margin: "0 auto",
          backgroundColor: "#f9fafb",
          borderRadius: 4,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", top: 20, left: 20 }}
        >
          <ArrowBack />
        </IconButton>

        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:5000/uploads/${lead.photo.split("/").pop()}`} // Ensures only the filename is used
          alt="Lead Photo"
          sx={{ borderRadius: 2, marginBottom: 3 }}
        />

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#1e293b" }}
        >
          {lead.fullName}
        </Typography>

        <Card
          sx={{
            backgroundColor: "#ffffff",
            padding: 3,
            borderRadius: 2,
            boxShadow: 2,
            textAlign: "left",
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Email:</strong> {lead.email}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Phone:</strong> {lead.phone}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Source:</strong> {lead.source}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginBottom: 1,
                color:
                  lead.priority === "High"
                    ? "#ef4444"
                    : lead.priority === "Medium"
                    ? "#f59e0b"
                    : "#10b981",
                fontWeight: "bold",
              }}
            >
              Priority: {lead.priority}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Assigned To:</strong> {lead.assignedToName}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Status:</strong> {lead.status}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Lead Stage:</strong> {lead.leadStage}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Estimated Value:</strong> {lead.estimatedValue ? `$${lead.estimatedValue}` : "N/A"}
            </Typography>

            {/* Display History */}
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>History:</strong>
              {lead.history === "yes"
                ? "Worked with us before"
                : "Has not worked with us before"}
            </Typography>

            {/* Display Notes */}
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Notes:</strong> {Array.isArray(lead.notes) && lead.notes.length > 0 ? lead.notes.join(", ") : "No notes available."}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Custom Attributes:</strong> {Object.keys(lead.customAttributes || {}).length > 0 ? Object.entries(lead.customAttributes).map(([key, value]) => `${key}: ${value}`).join(", ") : "No custom attributes."}
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", gap: 2, marginTop: 3, justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ marginRight: 1 }}
            startIcon={<Edit />}
            onClick={() => navigate(`/updateLead/${lead._id}`)} // Navigate to UpdateCustomer
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<Chat />}
            onClick={handleOpenDialog} // Open dialog on button click
            sx={{ color: "#1e40af", borderColor: "#1e40af" }}
          >
            Add Note
          </Button>
          <IconButton
            sx={{ color: "#10b981" }}
            onClick={() => navigate(`/add-activity`)} // Navigate to Add Activity page
          >
            <AddCircle sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Dialog for adding notes */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add a Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Note"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddNote} color="primary">
            Save Note
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default LeadDetailsPage;
