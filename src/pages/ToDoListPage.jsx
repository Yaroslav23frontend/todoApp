import React, { useState } from "react";
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
export default function ToDoListPage() {
  const [valueNav, setValueNav] = useState("all");
  const [searchData, setSearchData] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
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
      width: "calc(100% - 20px)",
      justifyContent: "space-between",
      marginLeft: "10px",
      marginRight: "10px",
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
  };
  async function logOut() {
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
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
  return (
    <Paper sx={styles.paper}>
      <Button sx={styles.buttonSignOut} onClick={logOut}>
        Sign out
      </Button>
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
            <Tab value="all" label="All" />
            <Tab value={""} label="Active" />
            <Tab value={true} label="Completed" />
          </Tabs>
          <Box sx={{ alignSelf: "flex-start" }}>
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
                label="Filter"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Today"}>Today</MenuItem>
                <MenuItem value={"Overdue"}>Overdue</MenuItem>
                <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={styles.select}>
              <InputLabel id="demo-simple-select-standard-label2">
                Sort by date
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
          <CustomBox>
            <Items
              filter={valueNav !== "all" ? true : false}
              completed={valueNav === "all" ? "all" : Boolean(valueNav)}
              searchData={searchData}
              search={searchData !== "" ? true : false}
              filterDate={filter}
              sort={sort}
            />
          </CustomBox>

          <AddItem />
        </>
      ) : (
        <Verified />
      )}
    </Paper>
  );
}
