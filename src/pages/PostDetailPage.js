import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Text2 from "../elements/Text2";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Modal from "../components/Modal";
import '../modal.css';

const PostDetailPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const [like, setLike] = React.useState(false);

  React.useEffect(() => {
    dispatch(postActions.getAPost(params));
  })
  const state = useSelector((state) => state.post_list);

  //modal   - 수정하기 . 삭제하기 버튼
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  const markLike = () => {
    setLike(true);
  }
  return(
    <DetailWrap>
      <ArrowBackIosIcon variant="text" style={{position:"absolute", left: "20px", top: "12px", color: "lightgrey", fontSize:"1.7em", lineHeight:"0.5"}}
      onClick={()=>history.goBack()}></ArrowBackIosIcon>
      <HomeIcon variant="text" style={{position:"absolute", left: "50px", top: "10px", fontSize:"1.9em", color: "lightgrey", lineHeight: "2.3"}}
      onClick={()=>history.push('/')}></HomeIcon>
      {/* 모달 */}
      <React.Fragment>
        <Button variant="text" style={{position:"absolute", right: "0", top: "0", color: "lightgrey", zIndex:"9999", lineHeight:"3", backgroundColor:"transparent"}} 
        onClick={openModal}>***</Button>
        <Modal postId={props.postId} open={modalOpen} close={closeModal} header="수정 및 삭제하기"></Modal>
      </React.Fragment>
        <ImageWrap>
          <img style={{backgroundSize: "cover", backgroundPosition: "center"}} src={props.image} alt={props.title} />
        </ImageWrap>
        <DetailContentWrap>
          <UserInfoWrap>
            <ProfileImg src={process.env.PUBLIC_URL + "/DaangnMarket_logo.png"} alt={"username"}/>
            <div style={{display: "grid", gridTemplateRows: "1fr 1fr", alignItems: "center"}}>
              <Text2 padding="10px 0 0 0 " fontFamily="AppleSDGothicNeoB" fontWeight="800" fontSize="18px">아이디</Text2>
              <Text2 padding="0 0 10px 0 " >위치</Text2>
            </div>
            {/* <Text2 padding="10px 0 0 0 " fontFamily="AppleSDGothicNeoB" fontWeight="800" fontSize="18px">{state.username}</Text2>
            <Text2 padding="0 0 10px 0 ">{state.location}</Text2> */}
          </UserInfoWrap>
          {/* 게시글 제목 */}
          <TitleWrap>
            <Text2 style={{alignItems:"center"}} margin="0 0 0 15px" fontFamily="AppleSDGothicNeoB" fontSize="1.5em">{props.title} 게시글 제목</Text2>
          </TitleWrap>
          {/* 게시글 카테고리 및 게시 시간 표기 */}
          <CategoryWrap>
          <Button variant="text" style={{ marginLeft: "5px",color:"grey"}}
          onClick={()=> history.push('/')}>여성의류{props.category}</Button>
            <Text2 color="grey" fontSize="13px">  {props.createdAt} 27분 전 올림 </Text2>
          </CategoryWrap>
          <ContentsWrap>
            <Text2>{props.contents}신세계 본점에서 2021년9월에 구매하였습니다. 선물로 하나 더 받아 필요없게 되어 팝니다! 연락주세요.</Text2>
          </ContentsWrap>
          <LikedWrap>
            <Text2 color="grey" fontSize="15px">관심 20{props.likeCount}</Text2>
          </LikedWrap>
          <LikesNPriceWrap>
            <FavoriteBorderIcon onClick={()=>markLike} style={{position: "relative", left:"15px", }}></FavoriteBorderIcon>
            <Text2 lineHeight="2.5em" fontFamily="AppleSDGothicNeoB" fontSize="1.2em">가격 원{props.price}</Text2>
            <Button style={{fontSize: "15px",color: "white", backgroundColor:"#FF8A3D", width: "100px", height:"3em"}}>채팅하기</Button>
          </LikesNPriceWrap>
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
  border-bottom: 1px solid lightgrey;
`
const DetailContentWrap = styled.div`
  width: 100%;
  height: 50%;
`
const UserInfoWrap = styled.div`
  width: 100%;
  height: 17%;
  display: grid;
  grid-template-columns: 1fr 5fr;
`
const ProfileImg = styled.img`
position: relative;
left: 15px;
top: 15px;
width: 40px;
height: 40px;
border-radius: 50px;
background-size: cover;
`
const TitleWrap = styled.div`
  width: 100%;
  height: 10%;
`
const CategoryWrap = styled.div`
  width: 100%;
  height: 8%;
  padding: 0 0 0 3px;
`
const ContentsWrap = styled.div`
  width: 100%;
  height: 45%;
  padding: 0 15px;
  box-sizing: border-box;
`
const LikedWrap = styled.div`
  width: 100%;
  height: 7%;
  box-sizing: border-box;
  padding: 0 15px;
  border-bottom: 1px solid lightgrey;
`
const LikesNPriceWrap = styled.div`
  width: 100%;
  height: 13%;
  display: grid;
  grid-template-columns: 1fr 3fr 1.5fr;
  align-items: center;
`

export default PostDetailPage;
