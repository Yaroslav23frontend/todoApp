import React, { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { addBoard, addItem } from "../store/action";
import * as yup from "yup";

export default function AddBoard() {
  const user = useSelector((state) => state.user.id);
  const data = useSelector((state) => state.boards);
  console.log(data);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  async function addNewItem(data) {
    dispatch({
      type: addBoard,
      payload: data.item,
    });
  }
  async function storeData() {
    console.log(data);
    await setDoc(doc(db, `${user}`, data[data.length - 1]), {});
    await setDoc(doc(db, `${user}-boards`, "boards"), { boards: [...data] });
  }
  useEffect(() => {
    if (count !== 0) {
      storeData();
    }
  }, [count]);
  const styles = {
    inputAddItem: {
      width: "calc(100% - 300px)",
      minWidth: "300px",
    },
    boxAddNew: {
      marginRight: "auto",
      marginLeft: "auto",
      width: "95%",
      position: "absolute",
      bottom: "20px",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
    dateAndButton: {
      alignSelf: "felx-start",
      display: "flex",
      gap: "20px",
    },
  };
  const validationSchema = yup.object({
    item: yup
      .string("Enter your password")
      .min(1, "Item should be  minimum 1 character length")
      .max(
        50,
        "The item should be less than 50 or equal to 50 characters in length"
      )
      .required("Item should be minimum 1 character length"),
  });
  const formik = useFormik({
    initialValues: {
      item: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = values;
      addNewItem(data);
      values.item = "";
      values.date = "";
      setCount(count + 1);
    },
  });
  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Box sx={styles.boxAddNew}>
        <TextField
          sx={styles.inputAddItem}
          id="item"
          name="item"
          label="Add new board"
          variant="standard"
          value={formik.values.item}
          onChange={formik.handleChange}
          error={formik.touched.item && Boolean(formik.errors.item)}
          helperText={formik.touched.item && formik.errors.item}
        />

        <Button variant="outlined" type="submit">
          Add
        </Button>
      </Box>
    </form>
  );
}
