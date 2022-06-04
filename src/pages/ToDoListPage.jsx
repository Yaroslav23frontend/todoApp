import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { addItems } from "../store/action";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
export default function ToDoListPage({ match }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valueNav, setValueNav] = useState("all");
  const [searchData, setSearchData] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const id = useSelector((state) => state.user.id);
  const { setId } = useAuth();
  const location = useLocation();
  function docName() {
    const index = location.pathname.lastIndexOf("/");
    const docName = location.pathname.substring(index + 1);
    return docName;
  }
  const boardName = docName();
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

  function handleChangeIndexNav(event, index) {
    console.log(index);
    setValueNav(index);
  }
  const { isVerified } = useAuth();
  async function getData() {
    const docSnap = await getDoc(doc(db, `${id}`, boardName)).catch((error) => {
      setLoading(false);
      if (error.message.includes("offline")) {
        return setError(t("messagesItems.offline"));
      }
      return setError(error.message);
    });
    const temp = [];
    let loading = true;
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      Object.values(docSnap.data()).map((el) => temp.push(el));
      loading = false;
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    if (temp.length === 0) {
      setId(0);
    } else {
      setId(temp[temp.length - 1].id);
    }
    dispatch({ type: addItems, payload: temp });
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.topNav}>
        <Button onClick={() => navigate("/settings")}>
          <SettingsIcon />
        </Button>
        <Box>
          <Button onClick={() => navigate("../boards")}>
            {t("buttons.boards")}
          </Button>
          <Button sx={styles.buttonSignOut} onClick={logOut}>
            {t("buttons.signOut")}
          </Button>
        </Box>
      </Box>

      {isVerified ? (
        <>
          <TextField
            sx={styles.inputSearch}
            id="standard-basic"
            label={t("placeholders.search")}
            variant="standard"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            InputProps={{
              endAdornment:
                searchData !== "" ? (
                  <Button onClick={() => setSearchData("")}>
                    {t("buttons.clear")}
                  </Button>
                ) : (
                  ""
                ),
            }}
          />
          <Tabs
            value={valueNav}
            onChange={handleChangeIndexNav}
            textColor="secondary"
            variant="fullWidth"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            sx={styles.tabs}
          >
            <Tab value="all" label={t("itemsTabs.all")} />
            <Tab value={""} label={t("itemsTabs.active")} />
            <Tab value={true} label={t("itemsTabs.completed")} />
          </Tabs>
          <Box
            sx={{
              display: "flex",
              width: "95%",
              gap: 2,
              alignSelf: "flex-start",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <FormControl variant="standard" sx={styles.select}>
              <InputLabel id="demo-simple-select-standard-label">
                Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                label={t("filters.filter")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Today"}>{t("filters.today")}</MenuItem>
                <MenuItem value={"Overdue"}>{t("filters.overdue")}</MenuItem>
                <MenuItem value={"Upcoming"}>{t("filters.upcoming")}</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={styles.select}>
              <InputLabel id="demo-simple-select-standard-label2">
                {t("filters.sort")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard2"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
                label="Sort"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"A to Z"}>A to Z</MenuItem>
                <MenuItem value={"Z to A"}>Z to A</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={styles.progress}>
            {loading ? <CircularProgress /> : <></>}
          </Box>

          <CustomBox>
            <Items
              filter={valueNav !== "all" ? true : false}
              completed={valueNav === "all" ? "all" : Boolean(valueNav)}
              searchData={searchData}
              search={searchData !== "" ? true : false}
              filterDate={filter}
              sort={sort}
              boardName={boardName}
              loading={loading}
              error={error}
            />
          </CustomBox>
          <AddItem docName={boardName} />
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
    minWidth: 120,
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
