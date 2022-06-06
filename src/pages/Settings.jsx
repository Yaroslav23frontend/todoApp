import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useSettings } from "../context/SettingsContext";
import SettingsItemsColors from "../components/SettingsItemsColors";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import CustomModal from "../components/Modal";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { addBoards, addItems } from "../store/action";
import { useTranslation } from "react-i18next";
import ChangeLan from "../components/ChangeLan";
import i18next from "i18next";
import CustomBox from "../components/CustomBox";
export default function Settings({ back }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.user);
  const { user } = useAuth();
  const [modal, setModal] = useState(false);
  const [modalDeleteAll, setModalDeleteAll] = useState(false);
  const [result, setResult] = useState("");
  const data = useSelector((state) => state.boards);
  const settings = useSelector((state) => state.settings);
  const [language, setLanguage] = useState(
    document.cookie
      .split(";")
      .filter((el) => el.match("i18next"))
      .join("")
      .slice(8)
  );
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
  function modalDeleteAllClose() {
    setModalDeleteAll(false);
  }
  function delAll() {
    dispatch({ type: addItems, payload: [] });
    dispatch({ type: addBoards, payload: [] });
    setDoc(doc(db, `${_user.id}-boards`, "boards"), {});
    data.forEach(async (el) => await deleteDoc(doc(db, `${_user.id}`, el)));
    modalDeleteAllClose();
  }
  function setLan(lan) {
    i18next.changeLanguage(lan);
    setLanguage(lan);
  }

  return (
    <Paper sx={styles.paper}>
      <Button
        sx={styles.buttonBack}
        onClick={() => {
          navigate(-1);
        }}
      >
        {t("buttons.back")}
      </Button>
      <CustomBox maxHeight="100%">
        <Box sx={styles.box}>
          <Typography sx={styles.title} variant="h5" component="h1">
            {t("settings.titles.personal")}
          </Typography>

          <Box sx={styles.box}>
            <Box sx={styles.boxDays}>
              <Typography>{_user.email}</Typography>
              <Button onClick={() => navigate("/resetEmail")}>
                {t("buttons.change")}
              </Button>
            </Box>
            <Box sx={styles.boxDays}>
              <Typography>{t("settings.password")}</Typography>
              <Button onClick={() => navigate("/resetPassword")}>
                {t("buttons.change")}
              </Button>
            </Box>
            <Box sx={styles.boxDays}>
              <Typography>{t("settings.deleteAccount")}</Typography>
              <Button onClick={() => setModal(true)}>
                {t("buttons.delete")}
              </Button>
            </Box>
            <Box sx={styles.boxDays}>
              <Typography>{t("settings.deleteAllData")}</Typography>
              <Button onClick={() => setModalDeleteAll(true)}>
                {t("buttons.delete")}
              </Button>
            </Box>
            <ChangeLan
              id="lan"
              label="lan"
              value={language}
              setValue={setLan}
            />
            <CustomModal
              handleCancele={modalClose}
              handleConfirm={deleteAccount}
              open={modal}
              massege={t("messagesModal.deleteAccount")}
              result={result}
            />
            <CustomModal
              handleCancele={modalDeleteAllClose}
              handleConfirm={delAll}
              open={modalDeleteAll}
              massege={t("messagesModal.deleteAllData")}
            />
          </Box>
          <Typography sx={styles.title} variant="h5" component="h1">
            {t("settings.titles.colors")}
          </Typography>
          <SettingsItemsColors
            label="color"
            id={t("settings.today")}
            value={settings.today}
            setValue={_setToday}
          />
          <SettingsItemsColors
            label="color"
            id={t("settings.overdue")}
            value={settings.overdue}
            setValue={_setOverdue}
          />
          <SettingsItemsColors
            label="color"
            id={t("settings.upcoming")}
            value={settings.upcoming}
            setValue={_setUpcoming}
          />
          <SettingsItemsColors
            label="color"
            id={t("settings.completed")}
            value={settings.completed}
            setValue={_setCompleted}
          />
          <Box sx={styles.boxDays}>
            <Typography>{t("settings.upcomingDays")}</Typography>
            <TextField
              sx={styles.textField}
              name="Upcoming(days)"
              value={settings.upcomingDays}
              onChange={(e) => _setUpcomingDays(e.target.value)}
              variant="standard"
              type="number"
            />
          </Box>
        </Box>
        <Button onClick={_resetSettings} sx={{ marginBottom: "20px" }}>
          {t("buttons.reset")}
        </Button>
      </CustomBox>
    </Paper>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "1000px",
    width: "100%",
    minHeight: "400px",
    height: "100vh",
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
    marginLeft: 8.6,
    textAlign: "center",
    marginBottom: "20px",
  },
  textDays: {
    width: 150,
  },
  buttonBack: {
    alignSelf: "flex-start",
  },
};
