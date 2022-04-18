import React, { useState } from "react";
// import styled from "styled-components";

import { Button, Grid, Text, Input } from "../elements/index";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { api } from "../shared/api";

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
    <Grid height="85%" margin="auto">
      {/* <Text size="30px" bold margin="0px 0px 30px 0px">
          회원가입
        </Text> */}
      <Input
        placeholder="아이디를 입력해주세요"
        margin="10px"
        _onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <Button
        margin="10px"
        bg="#FF9F57"
        color="#ffffff"
        _onClick={() => idCheck(id)}
      >
        아이디 중복 체크
      </Button>
      <div>
        {" "}
        <Input
          placeholder="닉네임을 입력해주세요"
          margin="10px"
          _onChange={(e) => {
            setNickName(e.target.value);
          }}
        />
        <Button
          margin="10px"
          bg="#FF9F57"
          color="#ffffff"
          _onClick={() => nickNameCheck(id)}
        >
          닉네임 중복 체크
        </Button>
      </div>{" "}
      <div>
        <Input
          placeholder="설정할 비밀번호를 입력해주세요"
          type="password"
          margin="10px "
          _onChange={(e) => {
            setPw(e.target.value);
          }}
        />
      </div>
      <div>
        <Input
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
          display="block"
          margin="10px"
          _onChange={(e) => {
            setpwCheck(e.target.value);
          }}
        />
      </div>
      <select
        name="location"
        id="location"
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value=" ">--선택--</option>
        <option value="서울시">서울시</option>
        <option value="경기도">경기도</option>
        <option value="충청도">충청도</option>
        <option value="경상도">경상도</option>
        <option value="강원도">강원도</option>
        <option value="제주도">제주도</option>
      </select>
      <Button bold margin="10px" _onClick={signUp} bg="#FF9F57" color="#ffffff">
        회원가입
      </Button>
    </Grid>
  );
};

export default SignUpPage;
