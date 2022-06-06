import React, { useState } from "react";
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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [authGoogleError, setAuthGoogleError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("../");
      })
      .catch((error) => {
        if (error.message.includes("network")) {
          return setAuthGoogleError(t("auth.messages.offline"));
        }
        return setAuthGoogleError(error.message);
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
          <Typography variant="h4" component="h1" sx={styles.title}>
            {t("auth.signUp.signUp")}
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
              label={t("auth.signUp.password")}
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
              label={t("auth.signUp.confirmPasword")}
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
              {t("auth.signUp.submit")}
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
              {t("auth.signUp.signInWithGoogle")}
            </Button>
            <Typography sx={styles.errorGoogle}>{authGoogleError}</Typography>

            <Link href="/">{t("auth.signUp.signIn")}</Link>
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
          <Typography variant="h4" component="h1" sx={styles.title}>
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
              {t("auth.forget.submit")}
            </Button>
            <Button onClick={() => navigate(-1)}>
              {t("auth.forget.back")}
            </Button>
            {resetEmail ? (
              <></>
            ) : (
              <Box sx={styles.linksBox}>
                <Link href="/signup">{t("auth.forget.signUp")}</Link>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Link href="/">{t("auth.forget.signIn")}</Link>
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
          <Typography variant="h4" component="h1" sx={styles.title}>
            {t("auth.forget.title")}
          </Typography>
          <Box sx={styles.inputBox}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label={t("auth.forget.password")}
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
              label={t("auth.forget.confirmPasword")}
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
              {t("auth.forget.submit")}
            </Button>
            <Button onClick={() => navigate(-1)}>
              {t("auth.forget.back")}
            </Button>
          </Box>
        </form>
      </Paper>
    );
  }
  return (
    <Paper sx={styles.paper}>
      <Header />
      <form onSubmit={formikSignIn.handleSubmit}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          {t("auth.signIn.signIn")}
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
            label={t("auth.signIn.password")}
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
            {t("auth.signIn.submit")}
          </Button>
          <Button
            sx={styles.button}
            color="primary"
            variant="contained"
            fullWidth
            onClick={signInWithGoogle}
          >
            <GoogleIcon sx={styles.icon}></GoogleIcon>
            {t("auth.signIn.signInWithGoogle")}
          </Button>
          <Typography sx={styles.errorGoogle}>{authGoogleError}</Typography>
          <Box sx={styles.linksBox}>
            <Link
              sx={[styles.link, { justifyContent: "flex-start" }]}
              href="/signup"
            >
              {t("auth.signIn.signUp")}
            </Link>
            <Divider
              sx={{
                height: 28,
                m: 0.5,
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              orientation="vertical"
            />
            <Link
              sx={[styles.link, { justifyContent: "flex-end" }]}
              href="/reset"
            >
              {t("auth.signIn.forget")}
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
    maxWidth: "400px",
    padding: "10px",
    width: "100%",
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
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",
  },
  link: {
    display: "flex",
  },
  error: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
    marginLeft: "15px",
    alignSelf: "flex-start",
  },
  errorGoogle: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
  },
  signUpLink: {
    justifySelf: "center",
  },
};
