import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import CategoryList from "../components/categorypage/CategoryList";
import { Text, Grid } from "../elements/index";

import { actionCreators as postActions } from "../redux/modules/post";
import { api } from "../shared/api";
import { Category } from "@mui/icons-material";

const CategoryResultPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const category = params.category;
  console.log(category);
  console.log(typeof category);

  React.useEffect(() => {
    dispatch(postActions.getCategory(category, 1));
  }, []);

  return (
    <Grid bg="#CCC">
      <Navbar is_flex>
        <Text bold size="20px" padding="0 0 0 10px">
          {category}
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
          onClick={() => window.location.replace("/category")}
        ></ArrowBackIosIcon>
      </Navbar>
      <CategoryList></CategoryList>
    </Grid>
  );
};

export default CategoryResultPage;
