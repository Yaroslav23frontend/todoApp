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
export default function ToDoListPage() {
  const [valueNav, setValueNav] = useState("all");
  const [searchData, setSearchData] = useState("");
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
      marginBottom: "20px",
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
            <Tab value={"true"} label="Completed" />
          </Tabs>
          <Items
            filter={valueNav !== "all" ? true : false}
            completed={!!valueNav}
            searchData={searchData}
            search={searchData !== "" ? true : false}
          />
          <AddItem />
        </>
      ) : (
        <Verified />
      )}
    </Paper>
  );
}
