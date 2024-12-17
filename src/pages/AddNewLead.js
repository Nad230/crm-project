import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";

const AddNewLead = () => {
  const navigate = useNavigate();

  const [newLead, setNewLead] = useState({
    fullName: "",
    email: "",
    phone: "",
    source: "",
    status: "New",
    assignedTo: "",
    priority: "Low",
    followUpDate: "",
    estimatedValue: "",
    description: "",
    photo: "", // Add photo field
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchSalesRepresentative = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/team/role/Sales Representative");
        const data = await response.json();

        if (response.ok && data.length > 0) {
          const rep = data[0]; // Assuming you want to assign the first Sales Representative
          setNewLead((prevState) => ({
            ...prevState,
            assignedTo: rep.fullName, // Use fullName from the backend response
          }));
          setTeam(data); // Store the list of Sales Representatives if needed later
        } else {
          // If no representatives are found, set a custom message
          setNewLead((prevState) => ({
            ...prevState,
            assignedTo: "No representatives available", // Custom message when no representatives are found
          }));
        }
      } catch (error) {
        console.error("Error fetching Sales Representative:", error);
        // Handle error properly
        setNewLead((prevState) => ({
          ...prevState,
          assignedTo: "Error fetching representative", // Message when there's an error fetching
        }));
      }
    };

    fetchSalesRepresentative();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/leads/upload-photo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setNewLead((prevState) => ({
          ...prevState,
          photo: data.filePath,
        }));
        alert("Photo uploaded successfully!");
      } else {
        throw new Error(data.message || "Failed to upload photo.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(error.message);
    }
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLead),
      });

      const data = await response.json();
      if (response.ok) {
        setTeam((prevTeam) => [...prevTeam, data]);
        navigate("/leads");
      } else {
        throw new Error(data.error || "There was an error adding the lead.");
      }
    } catch (error) {
      console.error("Error adding lead:", error);
      alert(error.message);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f0f4f8" }}>
      <Box sx={{ padding: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ color: "#3b82f6", fontWeight: "bold" }}>
          Add New Lead
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <form onSubmit={handleAddLead}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="fullName"
                value={newLead.fullName}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={newLead.email}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={newLead.phone}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Source"
                name="source"
                value={newLead.source}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Priority"
                value="Low"
                fullWidth
                variant="outlined"
                disabled
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Lead Stage"
                value="New"
                fullWidth
                variant="outlined"
                disabled
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Assigned To"
                value={newLead.assignedTo || "Awaiting Assignment"} // Change default message to something more suitable
                fullWidth
                variant="outlined"
                disabled
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Follow-up Date"
                name="followUpDate"
                type="date"
                value={newLead.followUpDate}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Estimated Value"
                name="estimatedValue"
                value={newLead.estimatedValue}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Discription"
                name="discription"
                value={newLead.tags}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={handleFileChange} />
              <Button onClick={handleFileUpload} variant="contained" sx={{ mt: 2 }}>
                Upload Photo
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" sx={{ background: "#3b82f6", color: "#ffffff" }}>
                Add Lead
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddNewLead;
