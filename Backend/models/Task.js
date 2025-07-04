const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  deadline: {
    type: Date, // 🗓 Deadline field added
  },
}, {
  timestamps: true, // optional: adds createdAt & updatedAt
});

module.exports = mongoose.model("Task", taskSchema);
