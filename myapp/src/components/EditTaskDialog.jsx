import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";

function EditTaskDialog({ open, onClose, task, users, projects, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setAssignedTo(task.assignedTo?._id || "");
      setProject(task.project?._id || "");
    }
  }, [task]);

  const handleSave = () => {
    onSave({
      ...task,
      title,
      description,
      assignedTo,
      project,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            value={title}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Assigned To</InputLabel>
            <Select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Project</InputLabel>
            <Select
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              {projects.map((proj) => (
                <MenuItem key={proj._id} value={proj._id}>
                  {proj.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTaskDialog;
