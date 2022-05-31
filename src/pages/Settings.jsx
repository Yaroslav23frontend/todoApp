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
export default function Settings() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const {
    today,
    _setToday,
    overdue,
    _setOverdue,
    upcoming,
    _setUpcoming,
    completed,
    _setCompleted,
    upcomingDays,
    _setUpcomingDays,
    them,
    _setThem,
  } = useSettings();
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
            <Typography>{user.email}</Typography>
            <Button>Change</Button>
          </Box>
          <Box sx={styles.boxDays}>
            <Typography>Password</Typography>
            <Button>Change</Button>
          </Box>
          <Box sx={styles.boxDays}>
            <Typography>Delete acount</Typography>
            <Button>Delete</Button>
          </Box>
          <Box sx={styles.boxDays}>
            <Typography>Delete all data</Typography>
            <Button>Delete</Button>
          </Box>
        </Box>
        <Typography sx={styles.title} variant="h4" component="h1">
          Colors
        </Typography>
        <SettingsItemsColors
          label="color"
          id="Today"
          value={today}
          setValue={_setToday}
        />
        <SettingsItemsColors
          label="color"
          id="Overdue"
          value={overdue}
          setValue={_setOverdue}
        />
        <SettingsItemsColors
          label="color"
          id="Upcoming"
          value={upcoming}
          setValue={_setUpcoming}
        />
        <SettingsItemsColors
          label="color"
          id="Completed"
          value={completed}
          setValue={_setCompleted}
        />
        <Box sx={styles.boxDays}>
          <Typography>Upcomming(days)</Typography>
          <TextField
            sx={styles.textField}
            name="Upcoming(days)"
            value={upcomingDays}
            onChange={(e) => _setUpcomingDays(e.target.value)}
            variant="standard"
            type="number"
          />
        </Box>
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
