import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { actionCreators as userActions } from "../redux/modules/user";

import { Grid } from "../elements/index";

import IconButton from "@mui/material/IconButton";

import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const BottomNavbar = (props) => {
  const history = useHistory();

  const { children } = props;

  // if (is_flex) {
  //   return (
  //     <React.Fragment>
  //       <Grid
  //         height="8%"
  //         fixed
  //         bottom="0px"
  //         bg="white"
  //         border_top=" 1px solid #bbb"
  //         padding="8px 16px"
  //         is_flex
  //       >
  //         {children}
  //       </Grid>
  //     </React.Fragment>
  //   );
  // }
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
        <IconButton onClick={() => history.push("/")}>
          <HomeIcon sx={{ fontSize: 30 }}></HomeIcon>
        </IconButton>
        <IconButton>
          <ListAltIcon sx={{ fontSize: 30 }}></ListAltIcon>
        </IconButton>
        <IconButton>
          <LocationOnOutlinedIcon
            sx={{ fontSize: 30 }}
          ></LocationOnOutlinedIcon>
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon sx={{ fontSize: 30 }}></ChatBubbleOutlineIcon>
        </IconButton>
        <IconButton onClick={() => history.push("/mypage")}>
          <PersonOutlineOutlinedIcon
            sx={{ fontSize: 30 }}
          ></PersonOutlineOutlinedIcon>
        </IconButton>
      </Grid>
    </React.Fragment>
  );
};

export default BottomNavbar;
