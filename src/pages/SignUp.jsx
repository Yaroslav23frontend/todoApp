import { Container } from "@mui/material";
import React, { useState } from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
export default function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const settings = useSelector((state) => state.settings);
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        await sendEmailVerification(userCredential.user);
        await setDoc(
          doc(db, `${userCredential.user.uid}-settings`, `settings`),
          settings
        );
        console.log(userCredential);
        navigate("../");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
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
      <Forms signUp={true} func={signUp} error={error} />
    </Container>
  );
}
