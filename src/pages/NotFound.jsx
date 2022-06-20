import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Paper sx={styles.paper}>
      <Typography variant="h2" fontWeight={"bold"}>
        404
      </Typography>
      <Typography variant="h4">Not found</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("../");
        }}
      >
        Home
      </Button>
    </Paper>
  );
}
const styles = {
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "320px",
    heigth: "auto",
    display: "flex",
    jusifyConten: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 2,
    padding: 2,
  },
};
