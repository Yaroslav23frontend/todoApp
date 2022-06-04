import { Container } from "@mui/material";
import React, { useState } from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
export default function SignIn() {
  const { t } = useTranslation();
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
          return setError(t("auth.messages.userNotFound"));
        } else if (error.message.includes("password")) {
          return setError(t("auth.messages.wrongPassword"));
        } else if (error.message.includes("network")) {
          return setError(t("auth.messages.offline"));
        }
        return setError(error.message);
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
