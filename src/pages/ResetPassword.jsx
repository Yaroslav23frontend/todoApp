import React, { useState } from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { updatePassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useAuth } from "../context/AuthContext";
export default function ResetPassword() {
  const navigate = useNavigate();
  const [changed, setChanged] = useState("");
  const { user } = useAuth();
  const [error, setError] = useState("");
  async function logOut() {
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("../passwordChanged");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function reset(password) {
    updatePassword(user, password)
      .then(() => {
        setChanged(true);
        logOut();
      })
      .catch((error) => {
        setChanged(error);
        setError(error.message);
      });
  }
  if (changed !== "" && changed !== true) {
    <Paper sx={styles.paper}>
      <Typography variant="h3" element="p">
        {changed}
      </Typography>
      <Button onClick={() => navigate("../settings")}>Back</Button>
    </Paper>;
  }
  return <Forms resetPassword={true} func={reset} error={error} />;
}
const styles = {
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    minWidth: "360px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    padding: 5,
  },
  text: {
    alignText: "center",
  },
};
