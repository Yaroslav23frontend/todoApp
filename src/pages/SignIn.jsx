import { Container } from "@mui/material";
import React, { useState } from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
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
      <Forms func={signIn} error={error}></Forms>
    </Container>
  );
}
