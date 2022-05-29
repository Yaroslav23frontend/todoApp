import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
export default function Verified() {
  const { user } = useAuth();
  const [sended, setSended] = useState(false);
  async function verifyEmail() {
    await sendEmailVerification(user);
    setSended(true);
  }
  const styles = {
    title: {
      textAlign: "center",
      marginBottom: "10px",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Box sx={styles.box}>
      {sended ? (
        <Typography sx={styles.title} variant="h5" component="p">
          We sand you verification link, chack your mail
        </Typography>
      ) : (
        <Typography sx={styles.title} variant="h5" component="p">
          Please verify your email
        </Typography>
      )}

      <Button variant="outlined" onClick={verifyEmail}>
        Verivy
      </Button>
    </Box>
  );
}
