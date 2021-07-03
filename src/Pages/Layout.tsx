import React from "react";
import { Grid } from "@material-ui/core";
import Header from "../Components/Header";
import './layout.scss'

export const Layout: React.FC = (props) => {
  return (
    <Grid container direction="column">
      <Grid item id="header">
        <Header />
      </Grid>
      <Grid item id="body">
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item>
            {props.children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
