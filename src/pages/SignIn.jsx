import { Container } from "@mui/material";
import React from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function SignIn() {
  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
      <Forms func={signIn}></Forms>
    </Container>
  );
}
