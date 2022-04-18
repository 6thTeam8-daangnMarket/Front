import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Text, Input, Button } from "../elements/index";

import Navbar from "../components/Navbar";
import Postlist from "../components/mainpage/Postlist";
import { actionCreators as postActions  } from "../redux/modules/post";
const MainPage = () => {
  // history 공부하자
  const history = useHistory();
  const dispatch = useDispatch();

  const [searchWord, setSearchWord] = React.useState("");

  const searchWordChange = (e) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  React.useEffect(() => {
    dispatch(postActions.getPost());
  }, []);

  return (
    <React.Fragment>
      <Navbar>
        <Input
          placeholder="검색어를 입력해주세요"
          _onChange={searchWordChange}
        ></Input>
        <Button _onClick={postActions.search(searchWord)}></Button>
      </Navbar>

      <Postlist></Postlist>
    </React.Fragment>
  );
};

export default MainPage;
