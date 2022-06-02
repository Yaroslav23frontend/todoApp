import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmationPassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const validationSchemaSignIn = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const validationSchemaReset = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
const validationSchemaResetPassword = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmationPassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export default function Forms({
  signUp,
  reset,
  func,
  resetText,
  resetEmail,
  resetPassword,
  error,
}) {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("../");
      })
      .catch((error) => {
        alert(error);
      });
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmationPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      func(values.email, values.password);
      alert(JSON.stringify(values, null, 2));
    },
  });
  const formikSignIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaSignIn,
    onSubmit: (values) => {
      func(values.email, values.password);
      alert(JSON.stringify(values, null, 2));
    },
  });
  const formikReset = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchemaReset,
    onSubmit: (values) => {
      func(values.email, values.password);
      alert(JSON.stringify(values, null, 2));
    },
  });
  const formikResetPassword = useFormik({
    initialValues: {
      password: "",
      confirmationPassword: "",
    },
    validationSchema: validationSchemaResetPassword,
    onSubmit: (values) => {
      func(values.password);
    },
  });
  if (signUp) {
    return (
      <Paper sx={styles.paper}>
        <Header />
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
            <TextField
              fullWidth
              id="confirmationPassword"
              name="confirmationPassword"
              label="Confirmation Password"
              type="password"
              value={formik.values.confirmationPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmationPassword &&
                Boolean(formik.errors.confirmationPassword)
              }
              helperText={
                formik.touched.confirmationPassword &&
                formik.errors.confirmationPassword
              }
            />
            <Typography sx={styles.error}>{error}</Typography>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
            <Button
              sx={styles.button}
              color="primary"
              variant="contained"
              fullWidth
              type="button"
              onClick={signInWithGoogle}
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
        <Header />
        <form onSubmit={formikReset.handleSubmit}>
          <Typography variant="h3" component="h1" sx={styles.title}>
            {resetText}
          </Typography>
          <Box sx={styles.inputBox}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formikReset.values.email}
              onChange={formikReset.handleChange}
              error={
                formikReset.touched.email && Boolean(formikReset.errors.email)
              }
              helperText={formikReset.touched.email && formikReset.errors.email}
            />
            <Typography sx={styles.error}>{error}</Typography>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
            <Button onClick={() => navigate(-1)}>Back</Button>
            {resetEmail ? (
              <></>
            ) : (
              <Box sx={styles.linksBox}>
                <Link href="/signup">Sign up</Link>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Link href="/">Sign in</Link>
              </Box>
            )}
          </Box>
        </form>
      </Paper>
    );
  }
  if (resetPassword) {
    return (
      <Paper sx={styles.paper}>
        <Header />
        <form onSubmit={formikResetPassword.handleSubmit}>
          <Typography variant="h3" component="h1" sx={styles.title}>
            Reset password
          </Typography>
          <Box sx={styles.inputBox}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="password"
              type="password"
              value={formikResetPassword.values.password}
              onChange={formikResetPassword.handleChange}
              error={
                formikResetPassword.touched.password &&
                Boolean(formikResetPassword.errors.password)
              }
              helperText={
                formikResetPassword.touched.password &&
                formikResetPassword.errors.password
              }
            />
            <TextField
              fullWidth
              id="confirmationPassword"
              name="confirmationPassword"
              label="Confirmation Password"
              type="password"
              value={formikResetPassword.values.confirmationPassword}
              onChange={formikResetPassword.handleChange}
              error={
                formikResetPassword.touched.confirmationPassword &&
                Boolean(formikResetPassword.errors.confirmationPassword)
              }
              helperText={
                formikResetPassword.touched.confirmationPassword &&
                formikResetPassword.errors.confirmationPassword
              }
            />
            <Typography sx={styles.error}>{error}</Typography>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
            <Button onClick={() => navigate("../settings")}>Back</Button>
          </Box>
        </form>
      </Paper>
    );
  }
  return (
    <Paper sx={styles.paper}>
      <Header />
      <form onSubmit={formikSignIn.handleSubmit}>
        <Typography variant="h3" component="h1" sx={styles.title}>
          Sign In
        </Typography>
        <Box sx={styles.inputBox}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formikSignIn.values.email}
            onChange={formikSignIn.handleChange}
            error={
              formikSignIn.touched.email && Boolean(formikSignIn.errors.email)
            }
            helperText={formikSignIn.touched.email && formikSignIn.errors.email}
          />
          {error.includes("User") ? (
            <Typography sx={styles.error}>{error}</Typography>
          ) : (
            <></>
          )}
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formikSignIn.values.password}
            onChange={formikSignIn.handleChange}
            error={
              formikSignIn.touched.password &&
              Boolean(formikSignIn.errors.password)
            }
            helperText={
              formikSignIn.touched.password && formikSignIn.errors.password
            }
          />
          {error.includes("password") ? (
            <Typography sx={styles.error}>{error}</Typography>
          ) : (
            <></>
          )}
          {error.includes("password") || error.includes("User") ? (
            <></>
          ) : (
            <Typography sx={styles.error}>{error}</Typography>
          )}
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <Button
            sx={styles.button}
            color="primary"
            variant="contained"
            fullWidth
            onClick={signInWithGoogle}
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
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "25px",
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
  error: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
    marginLeft: "15px",
    alignSelf: "flex-start",
  },
};
