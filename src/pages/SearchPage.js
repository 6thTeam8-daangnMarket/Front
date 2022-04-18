import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Input, Button, Text, Grid } from "../elements/index";
import Permit from "../components/mainpage/Permit";
import Navbar from "../components/Navbar";
import Postlist from "../components/mainpage/Postlist";

import { actionCreators as postActions } from "../redux/modules/post";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";

const SearchPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [searchWord, setSearchWord] = React.useState("");

  const searchWordChange = (e) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  // dispatch(postActions.getPost());

  return (
    <React.Fragment>
      <Navbar>
        <Input
          width="55%"
          height="1%"
          padding="10px 25px"
          placeholder="검색어를 입력해주세요"
          _onChange={searchWordChange}
        ></Input>

        <IconButton onClick={postActions.search(searchWord)}>
          <SearchOutlinedIcon />
        </IconButton>

        {/* <Button _onClick={postActions.search(searchWord)}></Button> */}
      </Navbar>
    </React.Fragment>
  );
};

export default SearchPage;
