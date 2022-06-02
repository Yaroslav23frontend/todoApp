import React, { useState, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Items from "../components/Items";
import { useAuth } from "../context/AuthContext";
import Verified from "../components/Verified";
import AddItem from "../components/AddItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CustomBox from "../components/CustomBox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddBoard from "../components/AddBoard";
import Board from "../components/Board";
import CustomModal from "../components/Modal";
import CircularProgress from "@mui/material/CircularProgress";
export default function Boards() {
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
        <Button onClick={() => navigate("/settings")}>
          <SettingsIcon />
        </Button>
        <Button sx={styles.buttonSignOut} onClick={logOut}>
          Sign out
        </Button>
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
                  <Button onClick={() => setSearchData("")}>Clear</Button>
                ) : (
                  ""
                ),
            }}
          />

          <Box sx={styles.progress}>
            {loading ? <CircularProgress /> : <></>}
          </Box>

          <CustomBox>
            {data.map((el) => {
              return <Board key={el} data={el} />;
            })}
            {data.length === 0 ? (
              <Typography sx={styles.text} variant="h6" component="h2">
                You don't have any boards yet
              </Typography>
            ) : (
              <></>
            )}
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
  nav: {
    display: "flex",
    justifyContent: "center",
  },
  inputSearch: {
    width: "95%",
    marginBottom: "20px",
  },
  inputAddItem: {
    width: "calc(100% - 120px)",
  },
  buttonSignOut: {
    alignSelf: "flex-end",
    width: "100px",
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
  colorsBox: {
    display: "flex",
    alignItems: "center",
    color: "#eee",
    width: "100%",
  },
  colors: {
    width: "90px",
    textAlign: "center",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  red: {
    backgroundColor: "red",
  },
  blue: {
    backgroundColor: "blue",
  },
  grey: {
    backgroundColor: "gray",
  },
  itemsBox: {
    width: "95%",
    maxHeight: "calc(100vh - 300px)",
    overflowY: "auto",
    tabSize: "0px",
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
