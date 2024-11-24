// routes/customerRoutes.js
router.post("/addCustomer", async (req, res) => {
  const { name, email, phone, company, Additional_Notes, status } = req.body;

  // Log the data received from the frontend
  console.log(req.body); // Check if data is being received correctly

  const newCustomer = new Customer({
    name,
    email,
    phone,
    company,
    Additional_Notes,
    status,
  });

  try {
    await newCustomer.save(); // Save the customer to MongoDB
    res.status(201).json({ message: "Customer added successfully!" });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ message: "Error adding customer", error });
  }
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});
