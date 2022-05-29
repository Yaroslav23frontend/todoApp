import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
export default function AddItem() {
  const user = useSelector((state) => state.user.email);
  async function addItem(data) {
    return await setDoc(doc(db, `${state.user.id}`, "items"), data);
  }
  const styles = {
    inputAddItem: {
      width: "calc(100% - 120px)",
    },
    boxAddNew: {
      width: "95%",
      padding: "20px",
      position: "absolute",
      bottom: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
    },
  };
  return (
    <Box sx={styles.boxAddNew}>
      <TextField
        sx={styles.inputAddItem}
        id="standard-basic"
        label="New item"
        variant="standard"
        inputProps={{ maxlength: 100 }}
      />
      <Button sx={styles.buttonSignOut} variant="outlined">
        Add
      </Button>
    </Box>
  );
}
