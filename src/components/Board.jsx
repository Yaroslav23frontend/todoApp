import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { db } from "../firebase/firebase";
import {
  deleteDoc,
  doc,
  updateDoc,
  deleteField,
  setDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard, deleteItem } from "../store/action";
import { completedItem } from "../store/action";
import { useNavigate } from "react-router-dom";
export default function Board({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const boards = useSelector((state) => state.boards);
  async function delItem() {
    dispatch({ type: deleteBoard, payload: data });
    await setDoc(doc(db, `${user}-boards`, `boards`), {
      boards: [...boards, data],
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
    checkboxBox: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
  };

  return (
    <Box sx={styles.box}>
      <Button onClick={() => navigate(`../boards/${data}`)}>{data}</Button>

      <Button onClick={delItem}>Delete</Button>
    </Box>
  );
}
