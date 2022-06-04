import React, { useState } from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Reset() {
  const { t } = useTranslation();
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
        if (error.message.includes("network")) {
          return setError(t("auth.messages.offline"));
        }
        return setError(errorMessage);
        // ..
      });
  }
  return (
    <Forms
      reset={true}
      resetText={t("auth.forget.title")}
      func={reset}
      error={error}
    />
  );
}
