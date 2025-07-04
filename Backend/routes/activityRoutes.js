const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity"); // ✅ correct line

// GET all activity logs
router.get("/", async (req, res) => {
  try {
    const logs = await Activity.find()
      .populate("user", "name")
      .sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
