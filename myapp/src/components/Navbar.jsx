// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

function Navbar() {
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { to: "/", label: "🏠 Home", show: true },
    { to: "/users", label: "👥 Users", show: loggedInUser?.role === "Admin" },
    { to: "/projects", label: "📁 Projects", show: !!loggedInUser },
    { to: "/tasks", label: "✅ Tasks", show: !!loggedInUser },
    { to: "/dashboard", label: "📊 Dashboard", show: loggedInUser?.role === "Admin" },
  ];

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#00bcd4" : "white",
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "2px solid #00bcd4" : "none",
    marginRight: 20,
    textDecoration: "none",
    paddingBottom: 2,
    transition: "all 0.2s ease-in-out",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
    >
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #0f172a 0%, #1e3a8a 100%)",
          px: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Title + Navigation */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                mr: 4,
                fontWeight: "bold",
                color: "#00bcd4",
                letterSpacing: 1,
              }}
            >
              🚀 Zeno Track
            </Typography>

            {navItems.map(
              (item) =>
                item.show && (
                  <motion.div
                    key={item.to}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <NavLink to={item.to} style={linkStyle}>
                      {item.label}
                    </NavLink>
                  </motion.div>
                )
            )}
          </Box>

          {/* User Info + Logout */}
          {loggedInUser && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: { xs: 2, sm: 0 },
              }}
            >
              <Typography sx={{ color: "white", mr: 2 }}>
                👤 {loggedInUser.name} ({loggedInUser.role})
              </Typography>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: "#00bcd4",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#00acc1",
                    },
                  }}
                >
                  Logout
                </Button>
              </motion.div>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Navbar;
