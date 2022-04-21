import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Image, Grid, Text } from "../../elements/index";
import Scroll from "../../elements/Scroll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { actionCreators as PostActions } from "../../redux/modules/post";

const Postlist = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post?.post_list);
  const is_login = useSelector((state) => state.user.is_login);
  const is_loading = useSelector((state) => state.post?.is_loading);
  const paging = useSelector((state) => state.post?.paging);
  const is_next= paging.lastPage? false: true;
  const history = useHistory();
  const postList = post_list?.postList;

  useEffect(() => {
    dispatch(PostActions.getFirstPostList());
  },[]);
  //없으면 빈채로 보여주고 생긴다음에 밑에 보여줌
  if (!postList) {
    return <div></div>;
  }
  return (
    <React.Fragment>
      <Grid bg="white" height="84%" fixed top="8%" padding="0px 16px" scroll>
        <Scroll 
          callNext={() => {
            dispatch(PostActions.getNextPostList(paging.start));
            }}
          is_next={is_next? true: false}
          loading={is_loading}>
        {postList.map((p) => {
          return (
            <Grid
              key={p.postId}
              height="21%"
              _onClick={() => {
                if (!is_login) {
                  window.alert("로그인 후 게시물을 확인할 수 있습니다!");
                  history.push("/login");
                } else {
                  history.push(`/post/detail/${p.postId}`);
                }
              }}
            >
              <Post key={p.postId}>
                <ImageBox>
                  <Image src={p.imageUrl}></Image>
                </ImageBox>
                <Contents>
                  <Text>{p.postTitle}</Text>

                  <Text>
                    {p.location} {p.createdAt}
                  </Text>

                  <Text bold>{p.price} 원</Text>

                  <Text>{p.category}</Text>

                  <Heart>
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                    <Text>{p.likeCount}</Text>
                  </Heart>
                </Contents>
              </Post>
            </Grid>
          );
        })}
        </Scroll>
      </Grid>
    </React.Fragment>
  );
};

export default Postlist;

const Post = styled.div`
  width: 100%;
  border-bottom: 1px solid #bbb;
  margin: auto;
  display: flex;
  padding: 8px 0px;
`;

const ImageBox = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 70%;
  padding: 8px 0;
`;

const Heart = styled.div`
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px 0 0;
`;
