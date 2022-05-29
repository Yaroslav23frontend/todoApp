import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { db } from "../firebase/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../store/action";
import { completedItem } from "../store/action";
export default function Item({ data, id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  async function delItem() {
    dispatch({ type: deleteItem, payload: id });
    await deleteDoc(doc(db, `${user}`, `${id}`));
  }
  async function updateItem(completed) {
    dispatch({
      type: completedItem,
      payload: { id: id, completed: completed },
    });
    await updateDoc(doc(db, `${user}`, `${id}`), {
      completed: completed,
    });
  }
  const styles = {
    box: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      gap: "10px",
    },
    text: {
      textDecoration: data.completed ? "line-through" : "none",
    },
  };
  return (
    <Box sx={styles.box}>
      <Checkbox
        onChange={(e) => {
          updateItem(e.target.checked);
        }}
        checked={data.completed}
      />

      <Typography sx={styles.text} variant="p" component="p">
        {data.item}
      </Typography>
      <Button onClick={delItem}>Delete</Button>
    </Box>
  );
}
