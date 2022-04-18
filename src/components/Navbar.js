import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import styled from "styled-components";
import { Grid } from "../elements/index";

const Navbar = () => {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.isLogin(localStorage.getItem("token")));
  }, [userId]);

  return (
    <React.Fragment>
      <Grid height="5%"></Grid>
    </React.Fragment>
  );
};

export default Navbar;
