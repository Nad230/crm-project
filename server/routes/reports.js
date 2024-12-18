const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const Activity = require('../models/Activity');



router.get('/sales-stats', async (req, res) => {
  try {
    // Your existing code here
  } catch (error) {
    console.error("Error fetching sales stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Dynamic route (should come after)
router.get('/lead/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Route: GET /api/lead-stats
router.get('/lead-stats', async (req, res) => {
  try {
    const statuses = ['New', 'Contacted', 'Qualified', 'Negotiation', 'Closed'];
    const counts = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Prepare response data with all statuses, even those with zero count
    const data = {
      labels: statuses,
      values: statuses.map(status => {
        const found = counts.find(item => item._id === status);
        return found ? found.count : 0;
      })
    };

    res.json(data);
  } catch (error) {
    console.error("Error fetching lead stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route: GET /api/sales-stats
router.get('/sales-stats', async (req, res) => {
  try {
    // Step 1: Aggregate data for leads with status 'Closed' and valid estimated values
    const sales = await Lead.aggregate([
      {
        $match: {
          status: 'Closed', // Only 'Closed' leads are considered as sales
          estimatedValue: { $ne: null } // Ensures 'estimatedValue' is valid (not null)
        }
      },
      {
        $group: {
          _id: { $month: "$followUpDate" }, // Group by month of 'followUpDate'
          totalSales: { $sum: "$estimatedValue" } // Sum all estimated values for each month
        }
      },
      {
        $sort: { "_id": 1 } // Sort results by month (ascending order)
      }
    ]);

    // Step 2: Prepare data for the last 6 months
    const currentDate = new Date(); // Current date
    const labels = []; // Array for month labels (e.g., Jan, Feb)
    const values = []; // Array for sales totals

    for (let i = 5; i >= 0; i--) {
      // Calculate the month and year for each of the last 6 months
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = date.getMonth() + 1; // 1-based month (January = 1)
      const monthLabel = date.toLocaleString('default', { month: 'short' }); // e.g., 'Jan', 'Feb'
      labels.push(monthLabel);

      // Find sales data for this specific month (if it exists)
      const sale = sales.find(s => s._id === month);
      values.push(sale ? sale.totalSales : 0); // If no sales data, push 0
    }

    // Step 3: Return the response in a structured format
    const data = {
      labels: labels, // Array of month names
      values: values  // Array of total sales for each month
    };

    res.json(data);
    res.json({ message: "Route works correctly!" }); // Send the response as JSON
  } catch (error) {
    console.error("Error fetching sales stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Route: GET /api/activity-timeline
router.get('/activity-timeline', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activities = await Activity.find({ date: { $gte: sevenDaysAgo } })
      .populate('lead', 'fullName')
      .sort({ date: -1 });

    const data = activities.map(activity => ({
      leadName: activity.lead.fullName,
      activityType: activity.activityType,
      description: activity.description,
      date: activity.date
    }));

    res.json(data);
  } catch (error) {
    console.error("Error fetching activity timeline:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
