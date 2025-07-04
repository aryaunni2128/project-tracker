import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import EditTaskDialog from "./EditTaskDialog";

function TaskPage() {
  const { loggedInUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const loadData = async () => {
    const [taskRes, userRes, projectRes] = await Promise.all([
      API.get("/tasks"),
      API.get("/users"),
      API.get("/projects"),
    ]);
    let visibleTasks = taskRes.data;
    if (loggedInUser?.role === "Team Member") {
      visibleTasks = visibleTasks.filter(
        (task) => task.assignedTo?._id === loggedInUser._id
      );
    }
    setTasks(visibleTasks);
    setUsers(userRes.data);
    setProjects(projectRes.data);
  };

  const exportCSV = () => {
    const csv = Papa.unparse(
      tasks.map((t) => ({
        Title: t.title,
        Description: t.description,
        Status: t.status,
        AssignedTo: t.assignedTo?.name || "",
        Project: t.project?.name || "",
        Deadline: t.deadline ? t.deadline.slice(0, 10) : "",
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "tasks.csv");
  };

  const createTask = async () => {
    if (!title || !assignedTo || !project) {
      toast.error("❌ All fields required!");
      return;
    }
    await API.post("/tasks", { title, description, assignedTo, project, deadline });
    toast.success("✅ Task Created!");
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setProject("");
    setDeadline("");
    loadData();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}/status`, { status });
    toast.info("📝 Task Status Updated");
    loadData();
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await API.delete(`/tasks/${id}`);
      toast.warn("🗑 Task deleted");
      loadData();
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setOpenEdit(true);
  };

  const saveTaskEdits = async (updatedTask) => {
    const { _id, title, description, assignedTo, project } = updatedTask;
    await API.put(`/tasks/${_id}`, { title, description, assignedTo, project });
    toast.success("✅ Task Updated");
    setOpenEdit(false);
    setEditTask(null);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("task.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        px: 2,
        py: 4,
      }}
    >
      <Box sx={{ background: "rgba(0,0,0,0.6)", borderRadius: 4, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" color="white">
            ✅ Task Manager
          </Typography>
          {loggedInUser?.role === "Admin" && (
            <Button variant="outlined" onClick={exportCSV}>
              ⬇ Download CSV
            </Button>
          )}
        </Box>

        {loggedInUser?.role === "Admin" && (
          <Box sx={{ borderRadius: 2, p: 2, mb: 4, background: "#fff" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                  InputProps={{ style: { color: "#000" } }}
                  InputLabelProps={{ style: { color: "#444" } }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Description"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                  InputProps={{ style: { color: "#000" } }}
                  InputLabelProps={{ style: { color: "#444" } }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth sx={{ backgroundColor: "#fff", borderRadius: 1 }}>
                  <InputLabel sx={{ color: "#444" }}>Assigned To</InputLabel>
                  <Select
                    value={assignedTo}
                    label="Assigned To"
                    onChange={(e) => setAssignedTo(e.target.value)}
                    sx={{ color: "#000" }}
                  >
                    {users.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth sx={{ backgroundColor: "#fff", borderRadius: 1 }}>
                  <InputLabel sx={{ color: "#444" }}>Project</InputLabel>
                  <Select
                    value={project}
                    label="Project"
                    onChange={(e) => setProject(e.target.value)}
                    sx={{ color: "#000" }}
                  >
                    {projects.map((p) => (
                      <MenuItem key={p._id} value={p._id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Deadline"
                  type="date"
                  InputLabelProps={{ shrink: true, style: { color: "#444" } }}
                  fullWidth
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                  InputProps={{ style: { color: "#000" } }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button variant="contained" fullWidth onClick={createTask}>
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" gutterBottom>{task.description}</Typography>
                  <Typography variant="body2">👤 {task.assignedTo?.name || "Unassigned"}</Typography>
                  <Typography variant="body2">📁 {task.project?.name || "None"}</Typography>
                  <Typography variant="body2">🗓 Deadline: {task.deadline?.slice(0, 10) || "None"}</Typography>

                  <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={task.status}
                      label="Status"
                      onChange={(e) => updateStatus(task._id, e.target.value)}
                    >
                      <MenuItem value="To Do">To Do</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Done">Done</MenuItem>
                    </Select>
                  </FormControl>

                  {loggedInUser?.role === "Admin" && (
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </Button>
                      <Button variant="outlined" size="small" onClick={() => handleEdit(task)}>
                        Edit
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <EditTaskDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          task={editTask}
          users={users}
          projects={projects}
          onSave={saveTaskEdits}
        />
      </Box>
    </Box>
  );
}

export default TaskPage;
