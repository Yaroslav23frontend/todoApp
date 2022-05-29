import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { addItem } from "../store/action";
import * as yup from "yup";
export default function AddItem() {
  const user = useSelector((state) => state.user.id);
  const { id, setId } = useAuth();
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  async function addNewItem(data, id) {
    dispatch({
      type: addItem,
      payload: {
        item: data,
        id: id + 1,
      },
    });

    await setDoc(doc(db, `${user}`, `${id + 1}`), {
      item: data,
      id: id + 1,
    });
    setId(id + 1);
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
  const validationSchema = yup.object({
    item: yup
      .string("Enter your password")
      .min(1, "Item should be of minimum 1 characters length")
      .max(
        50,
        "The item should be less than 50 or equal to 50 characters in length"
      ),
  });
  const formik = useFormik({
    initialValues: {
      item: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const item = values.item;
      values.item = "";
      addNewItem(item, id);
    },
  });
  return (
    <Box sx={styles.boxAddNew}>
      <TextField
        sx={styles.inputAddItem}
        id="item"
        name="item"
        label="New item"
        variant="standard"
        value={formik.values.item}
        onChange={formik.handleChange}
        error={formik.touched.item && Boolean(formik.errors.item)}
        helperText={formik.touched.item && formik.errors.item}
      />
      <Button
        variant="outlined"
        onClick={() => {
          formik.handleSubmit();
        }}
      >
        Add
      </Button>
    </Box>
  );
}
