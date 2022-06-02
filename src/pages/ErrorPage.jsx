import { Container } from "@mui/material";
import React, { useState } from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Header from "./Header";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
export default function SignIn() {
  const [error, setError] = useState("");
  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        if (error.message.includes("user")) {
          setError("User not found");
        } else if (error.message.includes("password")) {
          setError("Wrong password");
        }
      });
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Paper sx={styles.paper}>
        <Header />
        <Typography variant="h6" component="p" sx={styles.error}>
          Sign In
        </Typography>
      </Paper>
    </Container>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "25px",
  },

  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    minWidth: "360px",
  },

  error: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
    marginLeft: "15px",
    alignSelf: "flex-start",
  },
};
