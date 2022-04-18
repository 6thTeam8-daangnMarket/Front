import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import Text2 from "../elements/Text2";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const PostDetailPage = (props) => {
  //useSelect
  const state = useSelector((state) => state.post.detail);
  const history = useHistory();
  return(
    <DetailWrap>
      <Button variant="text" style={{position:"absolute", left: "0", top: "0", color: "white", fontSize:"1.5em", lineHeight:"0.5"}}>˱</Button>
      <Button variant="text" style={{position:"absolute", left: "50px", top: "0", color: "white", lineHeight: "0.5"}}>Home</Button>
        <ImageWrap>
          <img style={{backgroundColor:"green",backgroundSize: "cover", backgroundPosition: "center"}} src={props.image} alt={props.title} />
        </ImageWrap>
        <DetailContentWrap>
          <UserInfoWrap>
            <Text2>제목</Text2>
            <Text2>위치</Text2>
          </UserInfoWrap>
          <TitleWrap>
            <Text2 margin="0 0 0 10px" fontSize="1.7em">{props.title}</Text2>
          </TitleWrap>
          <CategoryWrap>
          <Button variant="text" onClick={()=> history.push('/')}>{props.category}</Button>
            <Text2> / {props.createdAt}</Text2>
          </CategoryWrap>
          <ContentsWrap>
            <Text2>{props.contents}</Text2>
          </ContentsWrap>
          <LikedWrap>
            <Text2>관심{props.likeCount}</Text2>
          </LikedWrap>
          <ReportDiv>
            <Text2 margin="0 0 0 10px" fontSize="1.3em">이 게시글 신고하기</Text2>
            <Button variant="text">&gt;</Button>
          </ReportDiv>
        </DetailContentWrap>
    </DetailWrap>
  );
};
const DetailWrap = styled.div`
  width: 100vw;
  height: 100vh;
`
const ImageWrap = styled.div`
  width: 100%;
  height: 50%;
  background-color: green;
`
const DetailContentWrap = styled.div`
  width: 100%;
  height: 50%;
`
const UserInfoWrap = styled.div`
  width: 100%;
  height: 17%;
  padding: auto 0 auto 20px;
  background-color: orange;
`
const TitleWrap = styled.div`
  width: 100%;
  height: 10%;
  padding: 10px 0 5px 20px;
  background-color: red;
`
const CategoryWrap = styled.div`
  width: 100%;
  height: 8%;
  padding: 0 0 0 20px;
  background-color: pink;
`
const LikedWrap = styled.div`
  width: 100%;
  height: 7%;
  padding: 0 0 0 20px;
  background-color: hotpink;
`
const ContentsWrap = styled.div`
  width: 100%;
  height: 48%;
  padding: 0 0 0 20px;
  background-color: blue;
`
const ReportDiv = styled.div`
  width: 100%;
  height: 10%;
  display: grid;
  grid-template-columns: 10fr 1fr;
  background-color: purple;
`
export default PostDetailPage;
