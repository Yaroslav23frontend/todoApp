import React from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Reset() {
  const navigate = useNavigate();
  function reset(email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        navigate("/resetMassege");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return <Forms reset={true} func={reset} />;
}
