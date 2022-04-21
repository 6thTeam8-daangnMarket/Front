import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "../components/Navbar";
import LikeList from "../components/mypage/LikeList";
import BottomNavbar from "../components/BottomNavbar";

import { Text, Grid, Image } from "../elements/index";

import { actionCreators as postActions } from "../redux/modules/post";

const MyPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(postActions.getLike());
  }, []);

  return (
    <React.Fragment>
      <Grid bg="#CCC">
        <Navbar>
          <Text bold size="20px" padding="0 0 0 10px">
            나의 당근
          </Text>
        </Navbar>
        {/* <Grid bg="white" height="16%">
          <Image
            width="40px"
            height="40px"
            src={process.env.PUBLIC_URL + "/DaangnMarket_logo.png"}
          ></Image>
        </Grid> */}
        <LikeList></LikeList>
        <BottomNavbar></BottomNavbar>
      </Grid>
    </React.Fragment>
  );
};

export default MyPage;
