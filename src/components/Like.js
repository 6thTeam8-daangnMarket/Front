import React from "react";
import styled from "styled-components";
import {actionCreators as CartActions} from "./../redux/modules/user";
import { actionCreators as PostActions } from "./../redux/modules/post";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

const Like = ({like, onClick}) => {
    console.log(like);
    if(like === false){
        return (
            <FavoriteBorderIcon onClick={onClick} style={{color:"lightgrey", margin: "0 20px", fontSize:"1.2em"}}/>
        )
    }else{
        return (
            <FavoriteIcon onClick={onClick}  sx={{ color: pink[500] }} style={{margin: "0 20px"}}/>
        )
    }
}

export default Like;