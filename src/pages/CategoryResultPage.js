import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Postlist from "../components/mainpage/Postlist";
import { Text, Grid } from "../elements/index";

import { actionCreators as postActions } from "../redux/modules/post";
import { api } from "../shared/api";

const CategoryResultPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const category = params.category;
  console.log(category);
  console.log(typeof category);

  const [loading, setLoading] = useState(false);
  const post_list = useSelector((state) => state.post?.post_list);

  React.useEffect(() => {
    const categoryLoad = async () => {
      setLoading(true);
      try {
        console.log("category :", category);
        const response = await api.get(`/api/category/${category}`);
        dispatch(postActions.set_post(response));
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    categoryLoad().then((r) => console.log("OK"));
  }, [category]);

  // React.useEffect(() => {
  //   const categoryLoad = () => {
  //     setLoading(true);
  //     return async function (dispatch, getState, { history }) {
  //       try {
  //         console.log("category :", category);
  //         const response = await api.get(`/api/category/${category}`);
  //         dispatch(postActions.set_post(response));
  //       } catch (err) {
  //         console.log(err);
  //       }
  //       setLoading(false);
  //     };
  //   };
  //   // categoryLoad().then((r) => console.log("OK"));
  // }, [category]);

  if (loading) {
    return <div>대기중...</div>;
  }

  if (!post_list) {
    return null;
  }

  return (
    <Grid bg="#CCC">
      <Navbar>
        <Text bold size="20px" padding="0 0 0 10px">
          카테고리 결과
        </Text>
        <ArrowBackIosIcon
          variant="text"
          style={{
            position: "absolute",
            left: "20px",
            top: "12px",
            color: "lightgrey",
            fontSize: "1.7em",
            lineHeight: "0.5",
          }}
          onClick={() => history.goBack()}
        ></ArrowBackIosIcon>
      </Navbar>
      <Postlist></Postlist>
    </Grid>
  );
};

export default CategoryResultPage;
