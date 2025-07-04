import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../services/api";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Admin");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("❌ Failed to load users");
    }
  };

  const addUser = async () => {
    if (!name) return;
    try {
      await API.post("/users", { name, role });
      toast.success("✅ User added");
      setName("");
      setRole("Admin");
      fetchUsers();
    } catch (err) {
      toast.error("❌ Failed to add user");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/users/${id}`);
        toast.success("🗑️ User deleted successfully");
        fetchUsers();
      } catch (err) {
        toast.error("❌ Failed to delete user");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url("user.png")`, // Ensure this image is in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        pt: 10,
        px: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.9)",
              color: "#333",
            }}
          >
            <Typography variant="h4" gutterBottom color="primary">
              👥 User Management
            </Typography>

            <Box display="flex" gap={2} alignItems="center" mb={3} flexWrap="wrap">
              <TextField
                label="User Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "#555" } }}
              />

              <FormControl
                sx={{ minWidth: 150, backgroundColor: "white", borderRadius: 1 }}
              >
                <InputLabel sx={{ color: "#555" }}>Role</InputLabel>
                <Select
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                  sx={{ color: "black" }}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Team Member">Team Member</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={addUser}
                sx={{ height: "56px", mt: { xs: 2, sm: 0 } }}
              >
                Add User
              </Button>
            </Box>

            <Paper elevation={3}>
              <List>
                {users.map((user) => (
                  <ListItem
                    key={user._id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => deleteUser(user._id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={user.name}
                      secondary={user.role}
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default UserPage;
