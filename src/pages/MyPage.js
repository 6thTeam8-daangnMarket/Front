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
    dispatch(postActions.getLike(1));
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
        <div style={{width:"100%", height: "50px", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Button variant="contained" style={{margin:"0 auto", backgroundColor: "#FAFAFA", color: "darkgrey"}}
          onClick={()=>{
            dispatch(postActions.getLike(page));
          }}>더 보기</Button>
          </div>
      </Grid>
    </React.Fragment>
  );
};

export default MyPage;
