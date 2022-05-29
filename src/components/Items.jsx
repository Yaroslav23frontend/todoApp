import React from "react";
import FormGroup from "@mui/material/FormGroup";
import Item from "./item";
export default function Items() {
  const styles = {
    formGroup: {
      width: "95%",
    },
  };
  return (
    <FormGroup sx={styles.formGroup}>
      <Item />
    </FormGroup>
  );
}
