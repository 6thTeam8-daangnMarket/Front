import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import LikeList from "../components/mypage/LikeList";
import BottomNavbar from "../components/BottomNavbar";
import { Button } from "@mui/material";
import { Text, Grid, Image } from "../elements/index";

import { actionCreators as postActions } from "../redux/modules/post";

const MyPage = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.post?.page);
  React.useEffect(() => {
    if (page === 1) {
      dispatch(postActions.getLike(1));
    }
  }, []);

  return (
    <React.Fragment>
      <Grid bg="#CCC">
        <Navbar>
          <Text bold size="20px" padding="0 0 0 10px">
            나의 관심상품
          </Text>
        </Navbar>
        <LikeList></LikeList>
        <BottomNavbar></BottomNavbar>
      </Grid>
    </React.Fragment>
  );
};

export default MyPage;
