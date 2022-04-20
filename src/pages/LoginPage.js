import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actionCreators as userActions } from "../redux/modules/user";

import { Button, Grid, Text, Input, Image } from "../elements/index";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");

  const login = () => {
    if (id === "" || pw === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    dispatch(userActions.logIn(id, pw));
  };

  return (
    <React.Fragment>
      <Grid margin="auto">
        <Navbar is_flex>
          <Image src="Danggeun_logo.png" width="30%" height="60%"></Image>
        </Navbar>

        <Grid
          bg="white"
          height="80%"
          fixed
          top="8%"
          padding="8px 8px"
          margin="8px 0 0 0"
          center
        >
          <Text size="32px" bold margin="0px 0px 16px 0px">
            로그인
          </Text>
          <Grid height="12%" is_flex>
            <Input
              width="100%"
              placeholder="아이디를 입력해주세요"
              margin="8px"
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Grid>

          <Grid height="12%" is_flex>
            {" "}
            <Input
              width="100%"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              margin="8px"
              _onChange={(e) => {
                setPw(e.target.value);
              }}
            />
          </Grid>

          <Grid height="12%" is_flex>
            <Button
              width="50%"
              margin="8px"
              bg="#FF9F57"
              color="#ffffff"
              _onClick={() => {
                console.log("로그인 시도");
                login();
              }}
            >
              로그인
            </Button>
            <Button
              width="50%"
              margin="8px"
              bg="#ffffff"
              color="#FF9F57"
              _onClick={(e) => {
                history.push("/signup");
              }}
            >
              회원가입
            </Button>
          </Grid>
          <Grid height="4%" center padding="40px 8px">
            <a
              id="custom-login-btn"
              href="https://kauth.kakao.com/oauth/authorize?client_id=d358b23f54bf03b7bc1822b251d45da7&redirect_uri=http://3.38.117.7/user/kakao/callback&response_type=code"
            >
              <img
                src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="90%"
                alt="카카오 로그인 버튼"
              />
            </a>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LoginPage;
