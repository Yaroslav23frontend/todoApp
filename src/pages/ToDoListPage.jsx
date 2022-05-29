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
export default function ToDoListPage() {
  const [valueNav, setValueNav] = useState("one");
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
          />
          <Tabs
            value={valueNav}
            onChange={handleChangeIndexNav}
            textColor="secondary"
            variant="fullWidth"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="All" />
            <Tab value="two" label="Active" />
            <Tab value="three" label="Completed" />
          </Tabs>
          <Items />
          <Box sx={styles.boxAddNew}>
            <TextField
              sx={styles.inputAddItem}
              id="standard-basic"
              label="New item"
              variant="standard"
            />
            <Button
              sx={styles.buttonSignOut}
              variant="outlined"
              onClick={logOut}
            >
              Add
            </Button>
          </Box>
        </>
      ) : (
        <Verified />
      )}
    </Paper>
  );
}
