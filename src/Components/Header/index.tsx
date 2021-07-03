import React from "react";
import { Grid } from "@material-ui/core";
import "./style.scss";

const Header: React.FC = () => {
  return (
    <Grid container direction="row" justify="space-between" alignItems="center" id="header">
      <Grid item>
        <h1>Fitness app</h1>
      </Grid>
      <Grid item>
          
      </Grid>
    </Grid>
  );
};

export default Header;
