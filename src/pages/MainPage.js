import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Input, Button, Text, Grid } from "../elements/index";
import Permit from "../components/mainpage/Permit";
import Navbar from "../components/Navbar";
import Postlist from "../components/mainpage/Postlist";

import { actionCreators as postActions } from "../redux/modules/post";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";

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
          {/* <Input
            width="55%"
            height="1%"
            padding="10px 25px"
            placeholder="검색어를 입력해주세요"
            _onChange={searchWordChange}
          ></Input> */}
          {/* <Button _onClick={postActions.search(searchWord)}></Button> */}
          <Text bold size="20px" padding="0 0 0 10px">
            {userLocation}
          </Text>
          <div>
            <IconButton
              onClick={() => {
                history.push("/search");
              }}
            >
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton>
              <MenuOutlinedIcon />
            </IconButton>
            <IconButton>
              <NotificationsNoneOutlinedIcon />
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
      </Grid>
    </React.Fragment>
  );
};

export default MainPage;
