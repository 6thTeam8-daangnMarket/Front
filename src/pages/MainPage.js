import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Text, Grid } from "../elements/index";

import Navbar from "../components/Navbar";
import Postlist from "../components/mainpage/Postlist";
import Permit from "../components/mainpage/Permit";
import BottomNavbar from "../components/BottomNavbar";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";

import IconButton from "@mui/material/IconButton";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";

import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const MainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLocation = useSelector((state) => state.user.location);
  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {
    dispatch(postActions.getPost());
  }, []);

  return (
    <React.Fragment>
      <Grid bg="#CCC">
        <Navbar>
          <Text bold size="20px" padding="0 0 0 10px">
            {userLocation}
          </Text>
          <div>
            <IconButton>
              <SearchOutlinedIcon
                onClick={() => {
                  history.push("/search");
                }}
              />
            </IconButton>
            <IconButton>
              <MenuOutlinedIcon
                onClick={() => {
                  history.push("/category");
                }}
              />
            </IconButton>
            <IconButton>
              <LoginTwoToneIcon
                onClick={() => {
                  history.push("/login");
                }}
              />
            </IconButton>
            <IconButton onClick={userActions.logout()}>
              <LogoutTwoToneIcon />
            </IconButton>
          </div>
        </Navbar>
        <Postlist></Postlist>

        <Permit>
          <Button
            is_float
            bg="#FF9F57"
            text="+"
            _onClick={() => {
              if (!is_login) {
                window.alert("로그인 후 게시물을 써주세요!");
                history.push("/login");
              } else {
                history.push("/post/write");
              }
            }}
          ></Button>
        </Permit>
        <BottomNavbar></BottomNavbar>
      </Grid>
    </React.Fragment>
  );
};

export default MainPage;
