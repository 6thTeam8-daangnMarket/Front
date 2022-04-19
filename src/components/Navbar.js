import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid } from "../elements/index";

const Navbar = (props) => {
  const { children, is_flex } = props;

  if (is_flex) {
    return (
      <React.Fragment>
        <Grid
          height="8vh"
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
        height="4%"
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
