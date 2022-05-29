import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
export default function Header() {
  const styles = {
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1976D2",
      color: "#fff",
      position: "absolute",
      width: "100%",
      top: 0,
      left: 0,
      borderRadius: "5px 5px 0 0",
    },
  };
  return (
    <Box sx={styles.box}>
      <Typography variant="h6" element="p">
        To Do App
      </Typography>
    </Box>
  );
}
