import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./useStyles";

export default function CheckEmailForActivation() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Typography component="h1" variant="h5">
            Thank you for signing up! Please check your email for activation
            link.
          </Typography>
        </Grid>
      </div>
    </Container>
  );
}
