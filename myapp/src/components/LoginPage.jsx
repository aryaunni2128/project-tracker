// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("Admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, role });
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/img.jpg')", // ✅ Make sure image is in /public/img.jpg
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Overlay for better contrast */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        }}
      />

      {/* ✅ Project Header */}
      <Box
        sx={{
          backgroundColor: "transparent",
          color: "#00bcd4",
          padding: 2,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
           Project Tasks Tracker
        </Typography>
      </Box>

      {/* ✅ Login Card */}
      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              mt: 3,
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              🔐 Login
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 3,
                  input: { color: "white" },
                  label: { color: "white" },
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ color: "white" }}>Role</InputLabel>
                <Select
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                  sx={{ color: "white" }}
                  required
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Team Member">Team Member</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Login
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default LoginPage;
