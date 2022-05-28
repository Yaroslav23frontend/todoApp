import React from "react";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
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
  async function logOut() {
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Paper sx={styles.paper}>
      <Typography sx={styles.title} variant="h2" component="h1">
        To do List
      </Typography>
      <Button onClick={logOut}>Sign out</Button>
    </Paper>
  );
}
