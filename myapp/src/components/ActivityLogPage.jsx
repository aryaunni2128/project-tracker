import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

function ActivityLogPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get("/activity").then((res) => setLogs(res.data));
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        🕵 Activity Logs
      </Typography>
      <List>
        {logs.map((log) => (
          <React.Fragment key={log._id}>
            <ListItem>
              <Typography>
                <b>{log.user?.name || "Unknown"}:</b> {log.action} <br />
                <small>{new Date(log.timestamp).toLocaleString()}</small>
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default ActivityLogPage;
