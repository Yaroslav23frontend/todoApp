import React, { useState } from "react";
import Forms from "../components/Forms";
import { auth } from "../firebase/firebase";
import { updateEmail, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/action";
import { useTranslation } from "react-i18next";
export default function ResetEmail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [changed, setChanged] = useState("");
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userInfo = useSelector((state) => state.user);
  const [error, setError] = useState();
  async function logOut() {
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("../emailChanged");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }
  function reset(email) {
    updateEmail(user, email)
      .then(() => {
        setChanged(true);
        logOut();
      })
      .catch((error) => {
        setChanged(error);
      });
  }
  if (changed) {
    return (
      <Paper sx={styles.paper}>
        <Typography variant="h3" element="p">
          Email changed successfuly
        </Typography>
      </Paper>
    );
  }
  if (changed !== "" && changed !== true) {
    <Paper sx={styles.paper}>
      <Typography variant="h3" element="p">
        {changed}
      </Typography>
      <Button onClick={() => navigate("../settings")}>Back</Button>
    </Paper>;
  }
  return (
    <Forms
      reset={true}
      resetEmail={true}
      resetText={t("settings.changeEmail")}
      func={reset}
      error={error}
    />
  );
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
