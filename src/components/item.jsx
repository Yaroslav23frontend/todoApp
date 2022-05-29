import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
export default function Item() {
  const styles = {
    box: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      gap: "10px",
    },
  };
  return (
    <Box sx={styles.box}>
      <Checkbox />
      <Typography variant="p" component="p">
        Item
      </Typography>
      <Button>Delete</Button>
    </Box>
  );
}
