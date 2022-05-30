import React, { useState } from "react";
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
  const [color, setColor] = useState(dateColor());
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
      textAlign: "center",
      borderTop: "1px solid #eee",
      borderBottom: "1px solid #eee",
    },
    text: {
      textDecoration: data.completed ? "line-through" : "none",
    },
    cicle: {
      backgroundColor: data.completed ? "gray" : color,
      borderRadius: "50%",
      width: "20px",
      height: "20px",
    },
    checkboxBox: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
  };
  function dateColor() {
    if (data.days === 0) {
      return "yellow";
    }
    if (data.days < 0) {
      return "red";
    }
    if (data.days >= 1 && data.days <= 5) {
      return "blue";
    }

    return "black";
  }
  return (
    <Box sx={styles.box}>
      <Box sx={styles.checkboxBox}>
        <Box sx={styles.cicle} />
        <Checkbox
          onChange={(e) => {
            updateItem(e.target.checked);
            if (e.target.checked) {
              setColor("gray");
            } else {
              setColor(dateColor());
            }
          }}
          checked={data.completed}
        />
      </Box>

      <Box>
        <Typography sx={styles.text} variant="p" component="p">
          {data.item}
        </Typography>
        <Typography sx={styles.text} variant="p" component="p">
          {data.dueDate}
        </Typography>
      </Box>

      <Button onClick={delItem}>Delete</Button>
    </Box>
  );
}
