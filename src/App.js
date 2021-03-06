import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckEmailForActivation from "./CheckEmailForActivation";
import Copyright from "./Copyright";
import useStyles from "./useStyles";
import LinearProgress from "@material-ui/core/LinearProgress";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Missing first name"),
  lastName: Yup.string().required("Missing last name"),
  email: Yup.string().email("Enter valid email").required("Missing email"),
  password: Yup.string()
    .min(8, "Password should be 8 characters long")
    .required("Missing password"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "Please accept our terms and conditions"
  ),
});

export default function SignUp() {
  const [signedUp, setSignedUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      acceptTerms: false,
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMessage("");
      console.log("signing up");
      setSignedUp(true);
    },
  });

  const {
    touched,
    errors,
    isSubmitting,
    handleChange: onChange,
    handleBlur: onBlur,
    handleSubmit,
  } = formik;

  if (isSubmitting) {
    return (
      <Typography component="h3" variant="h5">
        <LinearProgress />
        Vent venligst...
      </Typography>
    );
  }

  function signUpForm() {
    return (
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              onChange={onChange}
              helperText={touched.firstName ? errors.firstName : ""}
              error={touched.firstName && Boolean(errors.firstName)}
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              onChange={onChange}
              helperText={touched.lastName ? errors.lastName : ""}
              error={touched.lastName && Boolean(errors.lastName)}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              onChange={onChange}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              onChange={onChange}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onChange}
                  value="acceptTerms"
                  id="acceptTerms"
                  name="acceptTerms"
                  color="primary"
                />
              }
              label="I accept the terms and conditions"
            />
            <FormHelperText error={Boolean(errors.acceptTerms)}>
              {touched.acceptTerms ? errors.acceptTerms : ""}
            </FormHelperText>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" color="error">
          {errorMessage}
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {signedUp ? <CheckEmailForActivation /> : signUpForm()}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
