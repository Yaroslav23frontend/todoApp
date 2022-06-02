import React, { useState } from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Reset() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
        setError(errorMessage);
        // ..
      });
  }
  return (
    <Forms
      reset={true}
      resetText={"Reset the password"}
      func={reset}
      error={error}
    />
  );
}
