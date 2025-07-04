const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTasksByUser,
  updateTaskStatus,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.get("/user/:userId", getTasksByUser);
router.put("/:id/status", updateTaskStatus);

module.exports = router;
