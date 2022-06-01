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
            <TextField
              //   sx={styles.inputAddItem}
              id="item"
              name="item"
              label="New item"
              variant="standard"
              value={formik.values.item}
              onChange={formik.handleChange}
              error={formik.touched.item && Boolean(formik.errors.item)}
              helperText={formik.touched.item && formik.errors.item}
            />
            <Box sx={styles.boxButtons}>
              <Button onClick={formik.handleSubmit}>Rename</Button>
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
};
