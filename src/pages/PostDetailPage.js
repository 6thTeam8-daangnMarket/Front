import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import Like from "../components/Like";
import Text2 from "../elements/Text2";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Modal from "../components/Modal";
import '../modal.css';

const PostDetailPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // 파라미터로 postID값 받아옴
  const params = useParams(); 
  const postId = parseInt(params.postId);
  const userId = useSelector((state) => state.user.userId);
  const response = useSelector((state) => state.post?.post);
  
  const [like, setLike] = React.useState(false);
  const toggleLike = () => {
    if(like === false){
      setLike(true);
      dispatch(postActions.changeLikeCnt(postId));
    }
    else {
      setLike(false);
      dispatch(postActions.changeLikeCnt(postId));
    }
    
  }

  React.useEffect(() => {
    dispatch(postActions.getAPost(postId));
  },[]);

  //modal   - 수정하기 . 삭제하기 버튼
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }


  //왤까! 왤까 
  if(!response){   //state가 바뀌면 rerendering이 되면서 
    return <div></div>
  }
  return(
    <DetailWrap>
      <ArrowBackIosIcon 
      variant="text" 
      style={{
        position:"absolute", 
        left: "20px", 
        top: "12px", 
        color: "lightgrey", 
        fontSize:"1.7em", 
        lineHeight:"0.5"
      }}
      onClick={()=>history.goBack()}></ArrowBackIosIcon>
      <HomeIcon 
      variant="text" 
      style={{
        position:"absolute", 
        left: "50px", 
        top: "10px", 
        fontSize:"1.9em", 
        color: "lightgrey", 
        lineHeight: "2.3"
      }}
      onClick={()=>history.push('/')}></HomeIcon>
      {/* 모달 */}
      <React.Fragment>
        <Button 
        variant="text" 
        style={{
          position:"absolute", 
          right: "0", 
          top: "0", 
          color: "lightgrey", 
          zIndex:"9999", 
          lineHeight:"3", 
          backgroundColor:"transparent"
        }} 
        onClick={openModal}>***</Button>
        <Modal postId={postId} open={modalOpen} close={closeModal} header="수정 및 삭제하기"></Modal>
      </React.Fragment>
        <ImageWrap> 
          <img src={response.imageUrl} alt={response.postTitle} style={{backgroundSize: "cover", backgroundPosition:"center", height: "-webkit-fill-available", width: "inherit"}}/>
        </ImageWrap>
        <DetailContentWrap>
          <UserInfoWrap>
            <ProfileImg 
            src={process.env.PUBLIC_URL + "/DaangnMarket_logo.png"} 
            alt={response.userName}/>
            <div 
            style={{
              display: "grid", 
              gridTemplateRows: "1fr 1fr", 
              alignItems: "center"
              }}>
              <Text2 
              padding="10px 0 0 0 " fontFamily="AppleSDGothicNeoB" 
              fontWeight="800" 
              fontSize="18px"
              >{response.userName}</Text2>
              <Text2 padding="0 0 10px 0 " >{response.location}</Text2>
            </div>
          </UserInfoWrap>
          {/* 게시글 제목 */}
          <TitleWrap>
            <Text2 
            style={{alignItems:"center"}} 
            margin="0 0 0 15px" 
            fontFamily="AppleSDGothicNeoB" 
            fontSize="1.5em">{response.postTitle}</Text2>
          </TitleWrap>
          {/* 게시글 카테고리 및 게시 시간 표기 */}
          <CategoryWrap>
          <Button 
          variant="text" 
          style={{ 
            marginLeft: "5px",
            color:"grey"
          }}
          onClick={()=> history.push('/')}>{response.category}</Button>
            <Text2 color="grey" fontSize="13px">{response.createdAt} 올림 </Text2>
          </CategoryWrap>
          <ContentsWrap>
            <Text2>{response.postContents}</Text2>
          </ContentsWrap>
          <LikedWrap>
            <Text2 color="grey" fontSize="15px">관심 {response.likeCount}</Text2>
          </LikedWrap>
          <LikesNPriceWrap>
            {/* 게시글을 불러올 때 해당 회원이 해당 게시물 좋아요를 눌렀었는지여부 */}
            <Like like={like} onClick={toggleLike} {...props}/>
            <Text2 lineHeight="2.5em" fontFamily="AppleSDGothicNeoB" fontSize="1.2em"> {response.price} 원</Text2>
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
