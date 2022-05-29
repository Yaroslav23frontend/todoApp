import React from "react";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default function ResetRequest() {
  const styles = {
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },

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
      maxWidth: "360px",
    },
    linksBox: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
  };
  return (
    <Paper sx={styles.paper}>
      <Typography sx={styles.title} variant="h5" component="p">
        We sand you reset password request to your mail
      </Typography>
      <Box sx={styles.linksBox}>
        <Link
          sx={[styles.link, { justifyContent: "flex-start" }]}
          href="/signup"
        >
          Sign up
        </Link>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Link sx={[styles.link, { justifyContent: "flex-end" }]} href="/">
          Sign in
        </Link>
      </Box>
    </Paper>
  );
}
