import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Text } from "../elements/index";
import styled from "styled-components";

import IconButton from "@mui/material/IconButton";

import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const BottomNavbar = (props) => {
  const history = useHistory();

  const { children } = props;

  return (
    <React.Fragment>
      <Grid
        height="8%"
        fixed
        bottom="0px"
        bg="white"
        border_top=" 1px solid #bbb"
        padding="8px 16px"
        space_around
      >
        <Div>
          <IconButton onClick={() => history.push("/main")}>
            <HomeIcon sx={{ fontSize: 30 }}></HomeIcon>
          </IconButton>
          <Text>홈</Text>
        </Div>

        <Div>
          <IconButton>
            <ListAltIcon sx={{ fontSize: 30 }}></ListAltIcon>
          </IconButton>
          <Text>동네생활</Text>
        </Div>

        <Div>
          {" "}
          <IconButton>
            <LocationOnOutlinedIcon
              sx={{ fontSize: 30 }}
            ></LocationOnOutlinedIcon>
          </IconButton>
          <Text>내 근처</Text>
        </Div>

        <Div>
          <IconButton>
            <ChatBubbleOutlineIcon
              sx={{ fontSize: 30 }}
            ></ChatBubbleOutlineIcon>
          </IconButton>
          <Text>채팅</Text>
        </Div>

        <Div>
          <IconButton onClick={() => history.push("/mypage")}>
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: 30 }}
            ></PersonOutlineOutlinedIcon>
          </IconButton>
          <Text>나의 당근</Text>
        </Div>
      </Grid>
    </React.Fragment>
  );
};

export default BottomNavbar;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
