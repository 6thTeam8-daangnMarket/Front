import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input, Button } from "../elements/index";
import Navbar from "../components/Navbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";

import { actionCreators as postActions } from "../redux/modules/post";

import SearchList from "../components/SearchPage/SearchList";

const SearchPage = () => {
  const history = useHistory();
  // const dispatch = useDispatch();

  // const [query, setQuery] = useState("");
  const [searchWord, setSearchWord] = React.useState("");

  console.log(searchWord);

  const searchWordChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <React.Fragment>
      <Navbar is_flex>
        <ArrowBackIosIcon
          variant="text"
          style={{
            position: "absolute",
            left: "20px",
            top: "12px",
            color: "lightgrey",
            fontSize: "1.7em",
            lineHeight: "0.5",
          }}
          onClick={() => history.goBack()}
        ></ArrowBackIosIcon>

        <Input
          width="55%"
          height="1%"
          padding="10px 25px"
          placeholder="검색어를 입력해주세요"
          _onChange={searchWordChange}
        ></Input>

        <IconButton onClick={postActions.getSearch(searchWord)}>
          <SearchOutlinedIcon />
        </IconButton>
      </Navbar>
      <SearchList></SearchList>
    </React.Fragment>
  );
};

export default SearchPage;
