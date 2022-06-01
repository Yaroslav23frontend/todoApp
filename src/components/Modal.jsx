import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
export default function CustomModal({
  open,
  handleConfirm,
  massege,
  handleCancele,
  result,
}) {
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
