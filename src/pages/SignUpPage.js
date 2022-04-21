import React, { useState } from "react";
// import styled from "styled-components";

import { Button, Grid, Text, Input, Image } from "../elements/index";
import Navbar from "../components/Navbar";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { api } from "../shared/api";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [idDup, setIdDup] = useState(false);
  const [nickName, setNickName] = useState("");
  const [nickNameDup, setNickNameDup] = useState(false);
  const [location, setLocation] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setpwCheck] = useState("");

  const idCheck = (id) => {
    api
      .post("/user/idCheck", {
        username: id,
      })
      .then((res) => {
        setIdDup(true);
        console.log(res);
        if (res.data.status === "OK") {
          window.alert("사용할 수 있는 ID 입니다.");
        } else {
          window.alert("사용할 수 없는 ID 입니다.");
        }
      })
      .catch((err) => {
        console.log(err.response);
        window.alert("오류가 확인되었습니다. 다시 시도해주세요.");
      });
  };

  const nickNameCheck = (nickName) => {
    api
      .post("/user/nickNameCheck", {
        nickName: nickName,
      })
      .then((res) => {
        setNickNameDup(true);
        console.log(res.data.status);
        if (res.data.status === "OK") {
          window.alert("사용할 수 있는 닉네임 입니다.");
        } else {
          window.alert("사용할 수 없는 닉네임 입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("오류가 확인되었습니다. 다시 시도해주세요.");
      });
  };

  const signUp = () => {
    if (
      id === "" ||
      nickName === "" ||
      location === "" ||
      pw === "" ||
      pwCheck === ""
    ) {
      window.alert("위 입력란을 모두 입력해주세요.");
      return false;
    }

    if (idDup === false) {
      alert("아이디 중복 여부를 확인해주세요.");
      return false;
    }

    if (nickNameDup === false) {
      alert("닉네임 중복 여부를 확인해주세요.");
      return false;
    }

    if (pw !== pwCheck) {
      alert("비밀번호를 다시 확인해주세요.");
      return false;
    }

    dispatch(userActions.signUp(id, nickName, location, pw, pwCheck));
  };

  return (
    <Grid margin="auto">
      <Navbar is_flex>
        <Image src="Danggeun_logo.png" width="30%" height="60%"></Image>
      </Navbar>

      <Grid
        bg="white"
        height="92%"
        fixed
        top="8%"
        padding="8px 8px"
        margin="8px 0 0 0 "
        center
      >
        <Text size="200%" bold margin="0px 0px 16px 0px">
          회원가입
        </Text>

        <Grid height="10%">
          <Input
            width="55%"
            placeholder="아이디를 입력해주세요"
            margin="0 1%"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <Button
            width="40%"
            margin="0 1%"
            bg="#FF9F57"
            color="#ffffff"
            _onClick={() => idCheck(id)}
          >
            아이디 중복 체크
          </Button>
        </Grid>
        <Grid height="10%">
          <Input
            width="55%"
            placeholder="닉네임을 입력해주세요"
            margin="0 1%"
            _onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
          <Button
            width="40%"
            margin="0 1%"
            bg="#FF9F57"
            color="#ffffff"
            _onClick={() => nickNameCheck(id)}
          >
            닉네임 중복 체크
          </Button>
        </Grid>
        <Grid height="10%" is_flex>
          <Input
            width="100%"
            placeholder="설정할 비밀번호를 입력해주세요"
            type="password"
            margin="8px "
            _onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </Grid>
        <Grid height="10%" is_flex>
          <Input
            width="100%"
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            display="block"
            margin="8px"
            _onChange={(e) => {
              setpwCheck(e.target.value);
            }}
          />
        </Grid>
        <Grid height="10%" is_flex>
          <FormControl sx={{ m: 1, minWidth: "98%" }}>
            <InputLabel id="demo-simple-select-helper-label">지역</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={location}
              label="지역"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            >
              <MenuItem value={"서울시"}>서울시</MenuItem>
              <MenuItem value={"경기도"}>경기도</MenuItem>
              <MenuItem value={"충청도"}>충청도</MenuItem>
              <MenuItem value={"전라도"}>전라도</MenuItem>
              <MenuItem value={"경상도"}>경상도</MenuItem>
              <MenuItem value={"강원도"}>강원도</MenuItem>
              <MenuItem value={"제주도"}>제주도</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid height="10%" is_flex>
          <Button
            width="100%"
            margin="8px"
            _onClick={signUp}
            bg="#FF9F57"
            color="#ffffff"
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
