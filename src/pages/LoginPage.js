import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actionCreators as userActions } from "../redux/modules/user";

import { Button, Grid, Text, Input } from "../elements/index";

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

    dispatch(userActions.login(id, pw));
  };

  return (
    <React.Fragment>
      <Grid shadow="none" center>
        <Grid width="50%" height="50%" margin="10% auto">
          <Text size="30px" bold margin="0px 0px 50px 0px">
            로그인
          </Text>
          <Input
            placeholder="아이디를 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <Input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            margin="10px 0px"
            _onChange={(e) => {
              setPw(e.target.value);
            }}
          />
          <Button
            margin="17px 0px 0px 0px"
            _onClick={() => {
              console.log("로그인 시도");
              login();
            }}
            bg="#FF9F57"
            color="#ffffff"
          >
            로그인
          </Button>
          <Button
            margin="10px"
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
    </React.Fragment>
  );
};

export default LoginPage;
