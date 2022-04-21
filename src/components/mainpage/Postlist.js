import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Image, Grid, Text } from "../../elements/index";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { actionCreators as postActions } from "../../redux/modules/post";
import InfinityScroll from "../../shared/InfinityScroll";

const Postlist = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const post_list = useSelector((state) => state.post?.post_list);
  const page = useSelector((state) => state.post?.page);
  const has_next = useSelector((state) => state.post?.has_next);
  const is_loading = useSelector((state) => state.post?.is_loading);

  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPost(1));
    }
  }, []);

  //없으면 빈채로 보여주고 생긴다음에 밑에 보여줌
  // if (!post_list) {
  //   return <div></div>;
  // }

  return (
    <React.Fragment>
      <Grid bg="white" height="84%" fixed top="8%" padding="0px 16px" scroll>
        <InfinityScroll
          callNext={() => {
            console.log("next!");
            // dispatch(postActions.getPost(page));
          }}
          has_next={has_next ? true : false}
          is_loading={is_loading}
        >
          {post_list.map((p) => {
            if (p.like === false) {
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
                        {<FavoriteBorderIcon></FavoriteBorderIcon>}
                        <Text>{p.likeCount}</Text>
                      </Heart>
                    </Contents>
                  </Post>
                </Grid>
              );
            } else {
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
                        {
                          <FavoriteIcon
                            sx={{ color: pink[500] }}
                          ></FavoriteIcon>
                        }
                        <Text>{p.likeCount}</Text>
                      </Heart>
                    </Contents>
                  </Post>
                </Grid>
              );
            }
          })}
        </InfinityScroll>
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
