import React, { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { addItem } from "../store/action";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
export default function AddItem({ docName }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.id);
  const data = useSelector((state) => state.items);
  const { id, setId } = useAuth();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  async function addNewItem(data) {
    dispatch({
      type: addItem,
      payload: {
        item: data.item,
        id: id + 1,
        dueDate: data.date,
      },
    });
    setId(id + 1);
  }
  async function storeData(data) {
    console.log(docName);
    await updateDoc(doc(db, `${user}`, docName), {
      [id]: data,
    });
  }
  useEffect(() => {
    if (count !== 0) {
      storeData(data[data.length - 1]);
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
    date: yup.date("Enter your task").required("Please choose the date"),
  });
  const formik = useFormik({
    initialValues: {
      item: "",
      date: "",
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
          label={t("placeholders.addItem")}
          variant="standard"
          value={formik.values.item}
          onChange={formik.handleChange}
          error={formik.touched.item && Boolean(formik.errors.item)}
          helperText={formik.touched.item && formik.errors.item}
        />
        <Box sx={styles.dateAndButton}>
          <TextField
            type="date"
            id="date"
            name="date"
            variant="standard"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />

          <Button variant="outlined" type="submit">
            {t("buttons.add")}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
