import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
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
    padding: "20px",
    minWidth: "360px",
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: "10px",
  },
  linksBox: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    display: "flex",
    width: "150px",
  },
};
export default function Forms({ signUp, reset }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  if (signUp) {
    return (
      <Paper sx={styles.paper}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h3" component="h1" sx={styles.title}>
            Sign Up
          </Typography>
          <Box sx={styles.inputBox}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
            <Button
              sx={styles.button}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              <GoogleIcon sx={styles.icon}></GoogleIcon>
              Sign Up with google
            </Button>
            <Box sx={styles.linksBox}>
              <Link href="/">Sign in</Link>
            </Box>
          </Box>
        </form>
      </Paper>
    );
  }
  if (reset) {
    return (
      <Paper sx={styles.paper}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h3" component="h1" sx={styles.title}>
            Reset the password
          </Typography>
          <Box sx={styles.inputBox}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
            <Box sx={styles.linksBox}>
              <Link href="/signup">Sign up</Link>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <Link href="/">Sign in</Link>
            </Box>
          </Box>
        </form>
      </Paper>
    );
  }
  return (
    <Paper sx={styles.paper}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h3" component="h1" sx={styles.title}>
          Sign In
        </Typography>
        <Box sx={styles.inputBox}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <Button
            sx={styles.button}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            <GoogleIcon sx={styles.icon}></GoogleIcon>
            Sign In with google
          </Button>
          <Box sx={styles.linksBox}>
            <Link
              sx={[styles.link, { justifyContent: "flex-start" }]}
              href="/signup"
            >
              Sign up
            </Link>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Link
              sx={[styles.link, { justifyContent: "flex-end" }]}
              href="/reset"
            >
              Forget the password?
            </Link>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
