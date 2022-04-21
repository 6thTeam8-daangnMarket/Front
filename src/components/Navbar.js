import React from "react";
import { Grid } from "../elements/index";

const Navbar = (props) => {
  const { children, is_flex } = props;

  if (is_flex) {
    return (
      <React.Fragment>
        <Grid
          height="none"
          fixed
          top="0px"
          bg="white"
          border_bottom=" 1px solid #bbb"
          padding="8px 16px"
          is_flex
        >
          {children}
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid
        height="none"
        fixed
        top="0px"
        bg="white"
        border_bottom=" 1px solid #bbb"
        padding="8px 16px"
        space_between
      >
        {children}
      </Grid>
    </React.Fragment>
  );
};

export default Navbar;
