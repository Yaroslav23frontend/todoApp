import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { db } from "../firebase/firebase";
import { deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addBoards, deleteBoard, deleteItem } from "../store/action";
import { completedItem } from "../store/action";
import { useNavigate } from "react-router-dom";
import CustomModal from "./Modal";
export default function Board({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const boards = useSelector((state) => state.boards);
  const items = useSelector((state) => state.items);
  const [modal, setModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const id = useSelector((state) => state.user.id);
  async function delItem() {
    dispatch({ type: deleteBoard, payload: data });
    await deleteDoc(doc(db, user, data));
    await setDoc(doc(db, `${user}-boards`, `boards`), {
      boards: [...boards.filter((el) => el !== data)],
    });
  }
  function closeModal() {
    setModal(false);
  }
  function closeDelModal() {
    setDelModal(false);
  }
  async function renameBoard(docName) {
    const result = [...boards.filter((el) => el !== data), docName];
    dispatch({ type: addBoards, payload: result });
    const docSnap = await getDoc(doc(db, `${id}`, data));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await setDoc(doc(db, `${user}`, docName), docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    await setDoc(doc(db, `${user}-boards`, "boards"), { boards: result });
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
    <>
      <Box sx={styles.box}>
        <Button onClick={() => navigate(`../boards/${data}`)} color="inherit">
          {data}
        </Button>
        <Box>
          <Button onClick={() => setDelModal(true)}>Delete</Button>
          <Button onClick={() => setModal(true)}>Rename</Button>
        </Box>
      </Box>
      <CustomModal
        handleCancele={closeModal}
        handleConfirm={renameBoard}
        open={modal}
        boardName={data}
        editBoardName={true}
      />
      <CustomModal
        handleCancele={closeDelModal}
        handleConfirm={delItem}
        open={delModal}
        boardName={data}
        massege={"Do you want delete this board?"}
      />
    </>
  );
}
