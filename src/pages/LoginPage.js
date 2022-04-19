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
          <Image src="Danggeun_logo.png" width="30%" height="30%"></Image>
        </Navbar>

        {/* <Text size="30px" bold margin="0px 0px 50px 0px">
            로그인
          </Text> */}

        <Grid bg="white" padding="16px 16px" margin="24px 0 0 0 ">
          <Grid height="16%" is_flex>
            <Input
              width="100%"
              placeholder="아이디를 입력해주세요"
              margin="8px"
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Grid>

          <Grid height="16%" is_flex>
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

          <Grid height="16%" is_flex>
            {" "}
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LoginPage;
