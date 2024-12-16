const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const Activity = require('../models/Activity');

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
    // Assuming 'estimatedValue' represents sales and only 'Closed' leads are considered sales
    const sales = await Lead.aggregate([
      {
        $match: {
          status: 'Closed', // Only closed leads are considered as sales
          estimatedValue: { $ne: null }
        }
      },
      {
        $group: {
          _id: { $month: "$followUpDate" },
          totalSales: { $sum: "$estimatedValue" }
        }
      },
      {
        $sort: { "_id": 1 } // Sort by month
      }
    ]);

    // Prepare data with labels for the last 6 months
    const currentDate = new Date();
    const labels = [];
    const values = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = date.getMonth() + 1; // getMonth() is 0-indexed
      const monthLabel = date.toLocaleString('default', { month: 'short' });
      labels.push(monthLabel);

      const sale = sales.find(s => s._id === month);
      values.push(sale ? sale.totalSales : 0);
    }

    const data = {
      labels: labels,
      values: values
    };

    res.json(data);
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
