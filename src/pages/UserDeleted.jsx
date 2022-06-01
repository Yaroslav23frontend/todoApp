import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
export default function UserDeleted() {
  const navigate = useNavigate();
  return (
    <Paper sx={styles.paper}>
      <Typography variant="h3" element="p">
        User successfuly deleted
      </Typography>
      <Box sx={styles.box}>
        <Button onClick={() => navigate("../")}>Sign in</Button>
        <Button onClick={() => navigate("../signup")}>Sign up</Button>
      </Box>
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
  box: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
  },
};
