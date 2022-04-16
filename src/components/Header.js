import React from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import Text2 from "../elements/Text2";
import { fontSize, fontWeight } from "@mui/system";

const Header = (props) => {
  const isLogin = sessionStorage.getItem('token') ? true: false;
  if(!isLogin) {
    return (
      <React.Fragment>
        <HeaderWrap>
          <img src="Danggeun_logo.png" style={{width: "300px"}}></img>
          <ButtonWrap>
            <Button style={{color: "#FF9F57", fontSize:"1em"}}>로그인</Button>
            <Button style={{color: "#FF9F57", fontSize:"1em"}}>회원가입</Button>
          </ButtonWrap>
        </HeaderWrap>
        <Bar></Bar>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <HeaderWrap>
          <img src="Danggeun_logo.png" style={{width: "300px"}}></img>
          <ButtonWrap2>
            <Text2 fontSize="1em" display="flex" alignItems="center" >name 님</Text2>
            <Button style={{color: "#FF9F57", fontSize:"1em"}}>내 정보</Button>
            <Button style={{color: "#FF9F57", fontSize:"1em"}}>로그아웃</Button>
          </ButtonWrap2>
        </HeaderWrap>
        <Bar></Bar>
      </React.Fragment>
    )
  }
};
const HeaderWrap = styled.div`
  padding: 20px;
  width: 100%;
  height: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
`
const ButtonWrap = styled.div`
  position: absolute;
  right: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const ButtonWrap2 = styled.div`
  position: absolute;
  right: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
const Bar = styled.div`
  margin: 0px auto;
  width: 95%;
  height: 1px;
  background-color: lightgrey; // #FF9F57;
`
export default Header;
