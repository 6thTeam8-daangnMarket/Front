import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button1, Text, Grid } from "../elements/index";

import Navbar from "../components/Navbar";
import Postlist from "../components/mainpage/Postlist";
import Permit from "../components/mainpage/Permit";
import BottomNavbar from "../components/BottomNavbar";
import Fab from "@mui/material/Fab";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";

import IconButton from "@mui/material/IconButton";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";

const MainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // const post_data = useSelector((state) => state.post);
  // const [isLoading, setIsLoading] = React.useState(false);

  const userLocation = useSelector((state) => state.user?.location);
  const is_login = useSelector((state) => state.user.is_login);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid bg="#CCC">
          <Navbar>
            <Text bold size="150%" padding="0 0 0 10px">
              {userLocation}
            </Text>
            <div>
              <IconButton
                onClick={() => {
                  window.location.replace("/search");
                }}
              >
                <SearchOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push("/category");
                }}
              >
                <MenuOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(userActions.logout())}>
                <LogoutTwoToneIcon />
              </IconButton>
            </div>
          </Navbar>
          <Postlist></Postlist>

          <Fab
            style={{
              backgroundColor: "#FF9F57",
              color: "white",
              position: "fixed",
              bottom: "13%",
              right: "4%",
            }}
            onClick={() => {
              history.push("/post/write");
            }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>

          <BottomNavbar></BottomNavbar>
        </Grid>
      </React.Fragment>
    );
  }
};

export default MainPage;
