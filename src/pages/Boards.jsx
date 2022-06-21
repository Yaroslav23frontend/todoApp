import React, { useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";
import Verified from "../components/Verified";
import CustomBox from "../components/CustomBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddBoard from "../components/AddBoard";
import Board from "../components/Board";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { blue } from "@mui/material/colors";
import BackspaceIcon from "@mui/icons-material/Backspace";
export default function Boards() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const boards = useSelector((state) => state.boards);
  const { loading } = useAuth();
  async function logOut() {
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("../");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const { isVerified } = useAuth();
  const data = useMemo(() => {
    if (searchData !== "") {
      return boards.filter((el) => el.includes(searchData));
    }
    return boards;
  }, [searchData, boards]);
  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.topNav}>
        <IconButton onClick={() => navigate("/settings")}>
          <SettingsIcon sx={styles.button} />
        </IconButton>
        <IconButton onClick={logOut} sx={styles.button}>
          <LogoutIcon />
        </IconButton>
      </Box>

      {isVerified ? (
        <>
          <TextField
            sx={styles.inputSearch}
            id="standard-basic"
            label="Search"
            variant="standard"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            InputProps={{
              endAdornment:
                searchData !== "" ? (
                  <IconButton onClick={() => setSearchData("")}>
                    <BackspaceIcon />
                  </IconButton>
                ) : (
                  ""
                ),
            }}
          />

          <Box sx={styles.progress}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {data.length === 0 && boards.length === 0 ? (
                  <Typography sx={styles.text} variant="h6" component="h2">
                    {t("messagesBoards.noTasks")}
                  </Typography>
                ) : (
                  <></>
                )}
                {data.length === 0 ? (
                  <Typography sx={styles.text} variant="h6" component="h2">
                    {t("messagesBoards.notFound")}
                  </Typography>
                ) : (
                  <></>
                )}
              </>
            )}
          </Box>

          <CustomBox>
            {data.map((el) => {
              return <Board key={el} data={el} />;
            })}
          </CustomBox>

          <AddBoard />
        </>
      ) : (
        <Verified />
      )}
    </Paper>
  );
}
const styles = {
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
  inputSearch: {
    width: "calc(100% - 50px)",
    marginBottom: "20px",
  },
  tabs: {
    marginBottom: "10px",
  },
  topNav: {
    display: "flex",
    alignItems: "center",
    color: "#eee",
    width: "100%",
    justifyContent: "space-between",
  },
  select: {
    alignSelf: "flex-start",
    minWidth: 120,
    marginLeft: 5.5,
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  text: {
    width: "100%",
  },
  button: {
    color: blue[600],
  },
};
