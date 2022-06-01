import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useSettings } from "../context/SettingsContext";
import SettingsItemsColors from "../components/SettingsItemsColors";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import CustomModal from "../components/Modal";
export default function Settings() {
  const navigate = useNavigate();
  const _user = useSelector((state) => state.user);
  const { user } = useAuth();
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState("");
  const settings = useSelector((state) => state.settings);
  const {
    _setToday,
    _setOverdue,
    _setUpcoming,
    _setCompleted,
    _setUpcomingDays,
    _setThem,
    _resetSettings,
  } = useSettings();
  function deleteAccount() {
    deleteUser(user)
      .then(() => {
        // User deleted.
        setModal(false);
        navigate("../userDeleted");
      })
      .catch((error) => {
        // An error ocurred
        // ...
        setResult(error);
        setModal(true);
        setTimeout(() => {
          setModal(false);
        }, 1000);
      });
  }
  function modalClose() {
    setModal(false);
  }
  return (
    <Paper sx={styles.paper}>
      <Button
        sx={styles.buttonBack}
        onClick={() => {
          navigate("../");
        }}
      >
        Back
      </Button>
      <Box sx={styles.box}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Personal
        </Typography>

        <Box sx={styles.box}>
          <Box sx={styles.boxDays}>
            <Typography>{_user.email}</Typography>
            <Button onClick={() => navigate("/resetEmail")}>Change</Button>
          </Box>
          <Box sx={styles.boxDays}>
            <Typography>Password</Typography>
            <Button onClick={() => navigate("/resetPassword")}>Change</Button>
          </Box>
          <Box sx={styles.boxDays}>
            <Typography>Delete acount</Typography>
            <Button onClick={() => setModal(true)}>Delete</Button>
          </Box>
          <Box sx={styles.boxDays}>
            <Typography>Delete all data</Typography>
            <Button>Delete</Button>
          </Box>
          <CustomModal
            handleCancele={modalClose}
            handleConfirm={deleteAccount}
            open={modal}
            massege={"Do you want to delete this account?"}
            result={result}
          />
        </Box>
        <Typography sx={styles.title} variant="h4" component="h1">
          Colors
        </Typography>
        <SettingsItemsColors
          label="color"
          id="Today"
          value={settings.today}
          setValue={_setToday}
        />
        <SettingsItemsColors
          label="color"
          id="Overdue"
          value={settings.overdue}
          setValue={_setOverdue}
        />
        <SettingsItemsColors
          label="color"
          id="Upcoming"
          value={settings.upcoming}
          setValue={_setUpcoming}
        />
        <SettingsItemsColors
          label="color"
          id="Completed"
          value={settings.completed}
          setValue={_setCompleted}
        />
        <Box sx={styles.boxDays}>
          <Typography>Upcomming(days)</Typography>
          <TextField
            sx={styles.textField}
            name="Upcoming(days)"
            value={settings.upcomingDays}
            onChange={(e) => _setUpcomingDays(e.target.value)}
            variant="standard"
            type="number"
          />
        </Box>
        <Button onClick={_resetSettings}>Reset</Button>
      </Box>
    </Paper>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "1000px",
    width: "100%",
    minHeight: "400px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
  },
  boxDays: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
    gap: "20px",
  },
  textField: {
    width: 120,
    marginLeft: 7.6,
    textAlign: "center",
  },
  textDays: {
    width: 150,
  },
  buttonBack: {
    alignSelf: "flex-start",
  },
};
