import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserPage from "./components/UserPage";
import TaskPage from "./components/TaskPage";
import ProjectPage from "./components/ProjectPage";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/LoginPage";
import { useAuth } from "./context/AuthContext";

function App({ toggleMode }) {
  const { loggedInUser } = useAuth();

  return (
    <Router>
      <Navbar toggleMode={toggleMode} /> {/* ✅ Moved inside function */}
      <Routes>
        {/* Login route */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin only route */}
        <Route
          path="/dashboard"
          element={
            loggedInUser?.role === "Admin" ? <DashboardPage /> : <Navigate to="/" />
          }
        />

        {/* Admin only for users */}
        <Route
          path="/users"
          element={
            loggedInUser?.role === "Admin" ? <UserPage /> : <Navigate to="/" />
          }
        />

        {/* Protected routes for all roles */}
        <Route
          path="/projects"
          element={loggedInUser ? <ProjectPage /> : <Navigate to="/" />}
        />
        <Route
          path="/tasks"
          element={loggedInUser ? <TaskPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
