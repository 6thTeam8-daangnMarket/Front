import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Input, Button } from "../elements/index";
import Navbar from "../components/Navbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";

import { actionCreators as postActions } from "../redux/modules/post";

import SearchList from "../components/SearchPage/SearchList";

const SearchPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.post?.page);
  // const [query, setQuery] = useState("");
  const [searchWord, setSearchWord] = React.useState("");

  const searchWordChange = (e) => {
    setSearchWord(e.target.value);
  };

  const search = () => {
    if (searchWord === "") {
      window.alert("검색어를 입력해주세요!");
      return;
    }
    dispatch(postActions.getSearch(searchWord, page));
  };

  return (
    <React.Fragment>
      <Navbar is_flex>
        <ArrowBackIosIcon
          variant="text"
          style={{
            position: "absolute",
            left: "8%",
            // top: "12px",
            color: "lightgrey",
            fontSize: "170%",
            lineHeight: "0.5",
          }}
          onClick={() => history.goBack()}
        ></ArrowBackIosIcon>

        <Input
          width="50%"
          height="1%"
          padding="10px 25px"
          margin="0 0 0 12%"
          placeholder="검색어를 입력해주세요"
          _onChange={searchWordChange}
        ></Input>

        <IconButton onClick={search}>
          <SearchOutlinedIcon />
        </IconButton>
      </Navbar>
      <SearchList></SearchList>
    </React.Fragment>
  );
};

export default SearchPage;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
