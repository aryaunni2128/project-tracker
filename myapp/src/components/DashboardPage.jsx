import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [taskRes, userRes, projectRes] = await Promise.all([
      API.get("/tasks"),
      API.get("/users"),
      API.get("/projects"),
    ]);
    setTasks(taskRes.data);
    setUsers(userRes.data);
    setProjects(projectRes.data);
  };

  const taskStatusData = [
    { name: "To Do", value: tasks.filter((t) => t.status === "To Do").length },
    { name: "In Progress", value: tasks.filter((t) => t.status === "In Progress").length },
    { name: "Done", value: tasks.filter((t) => t.status === "Done").length },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("dashboard.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        p: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
          }}
        >
          <Typography variant="h4" gutterBottom>
            📊 Admin Dashboard
          </Typography>

          {/* Summary Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#1976d2", color: "white" }}>
                <CardContent>
                  <Typography variant="h6">🧾 Tasks: {tasks.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#388e3c", color: "white" }}>
                <CardContent>
                  <Typography variant="h6">👥 Users: {users.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: "#f57c00", color: "white" }}>
                <CardContent>
                  <Typography variant="h6">📁 Projects: {projects.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Bar Chart */}
          <Typography variant="h6" gutterBottom>
            📈 Tasks by Status
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskStatusData}>
              <XAxis dataKey="name" stroke="white" />
              <YAxis allowDecimals={false} stroke="white" />
              <Tooltip />
              <Bar dataKey="value" fill="#00bcd4" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Container>
    </Box>
  );
}

export default DashboardPage;
