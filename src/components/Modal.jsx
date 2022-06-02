import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
export default function CustomModal({
  open,
  handleConfirm,
  massege,
  handleCancele,
  result = "",
  boardName,
  editBoardName,
  item = { item: "", date: "" },
  editItem,
  editFirestore,
}) {
  const validationSchema = yup.object({
    item: yup
      .string("Enter your password")
      .min(1, "Item should be  minimum 1 character length")
      .max(
        20,
        "The item should be less than 20 or equal to 20 characters in length"
      )
      .required("Item should be minimum 1 character length"),
  });
  const validationSchemaEditItem = yup.object({
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
      item: boardName,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = values;
      handleConfirm(data.item);
      values.item = "";
    },
  });
  console.log(item.item);
  const formikEditItem = useFormik({
    initialValues: {
      item: item.item,
      date: item.date,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = values;
      handleConfirm(data);
      values.item = "";
      values.date = "";
    },
  });
  if (result !== "") {
    return (
      <div>
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={styles.box}>
            <p id="parent-modal-description">{result}</p>
          </Box>
        </Modal>
      </div>
    );
  }
  if (editBoardName) {
    return (
      <div>
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={styles.box}>
            <Box sx={styles.boxEdit}>
              <TextField
                sx={styles.input}
                id="item"
                name="item"
                label="Rename"
                variant="standard"
                value={formik.values.item}
                onChange={formik.handleChange}
                error={formik.touched.item && Boolean(formik.errors.item)}
                helperText={formik.touched.item && formik.errors.item}
              />
            </Box>
            <Box sx={styles.boxButtons}>
              <Button onClick={formik.handleSubmit}>Rename</Button>
              <Button onClick={handleCancele}>Cancel</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }
  if (editItem) {
    return (
      <div>
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={styles.box}>
            <Box sx={styles.boxEdit}>
              <TextField
                sx={styles.input}
                id="item"
                name="item"
                label="Edit item"
                variant="standard"
                value={formikEditItem.values.item}
                onChange={formikEditItem.handleChange}
                error={
                  formikEditItem.touched.item &&
                  Boolean(formikEditItem.errors.item)
                }
                helperText={
                  formikEditItem.touched.item && formikEditItem.errors.item
                }
              />
              <TextField
                sx={styles.input}
                type="date"
                id="date"
                name="date"
                variant="standard"
                value={formikEditItem.values.date}
                onChange={formikEditItem.handleChange}
                error={
                  formikEditItem.touched.date &&
                  Boolean(formikEditItem.errors.date)
                }
                helperText={
                  formikEditItem.touched.date && formikEditItem.errors.date
                }
              />
            </Box>

            <Box sx={styles.boxButtons}>
              <Button onClick={formikEditItem.handleSubmit}>Submit</Button>
              <Button onClick={handleCancele}>Cancel</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={styles.box}>
          <p id="parent-modal-description">{massege}</p>
          <Box sx={styles.boxButtons}>
            <Button onClick={handleConfirm}>Delete</Button>
            <Button onClick={handleCancele}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
const styles = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  },
  boxButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
  },
  boxEdit: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    gap: 2,
  },
  input: {
    marginBottom: 2,
  },
};
