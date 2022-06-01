import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
export default function EmailChangedSuccess() {
  const navigate = useNavigate();
  return (
    <Paper sx={styles.paper}>
      <Typography variant="h3" element="p">
        Email changed successfuly
      </Typography>
      <Button onClick={() => navigate("../")}>Sign in</Button>
    </Paper>
  );
}
const styles = {
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    minWidth: "360px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    padding: 5,
  },
  text: {
    alignText: "center",
  },
};
