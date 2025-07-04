import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Container,
} from "@mui/material";

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const addProject = async () => {
    if (!name) return alert("Project name is required");
    await API.post("/projects", { name, description });
    setName("");
    setDescription("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("project.png")`, // ✅ Ensure this is in your public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: 8,
        px: 2,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.9)",
            color: "#1e293b",
          }}
        >
          <Typography variant="h4" gutterBottom color="primary">
            📁 Project Management
          </Typography>

          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Project Name"
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{ style: { color: "#000" } }}
                InputLabelProps={{ style: { color: "#444" } }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{ style: { color: "#000" } }}
                InputLabelProps={{ style: { color: "#444" } }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "100%" }}
                onClick={addProject}
              >
                Add Project
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <Card
                  sx={{
                    backgroundColor: "#1e293b",
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body2" color="#ccc">
                      {project.description || "No description"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProjectPage;
