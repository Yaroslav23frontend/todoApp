import { Container } from "@mui/material";
import React from "react";
import Forms from "../components/Forms/Forms";
export default function SignUp() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Forms signUp={true} />
    </Container>
  );
}
