import { Container } from "@mui/material";
import React from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        await sendEmailVerification(userCredential.user);
        console.log(userCredential);
        navigate("../");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
      <Forms signUp={true} func={signUp} />
    </Container>
  );
}
