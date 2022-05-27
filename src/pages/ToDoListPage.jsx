import React from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
export default function ToDoListPage() {
  const styles = {
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },

    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      minWidth: "360px",
    },
  };
  return (
    <Paper sx={styles.paper}>
      <Typography sx={styles.title} variant="h2" component="h1">
        To do List
      </Typography>
    </Paper>
  );
}
