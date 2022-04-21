import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Text, Grid } from "../elements/index";
import Navbar from "../components/Navbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import IconButton from "@mui/material/IconButton";

import ComputerIcon from "@mui/icons-material/Computer";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LightIcon from "@mui/icons-material/Light";

import StrollerIcon from "@mui/icons-material/Stroller";
import CountertopsIcon from "@mui/icons-material/Countertops";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ShowerIcon from "@mui/icons-material/Shower";
import PetsIcon from "@mui/icons-material/Pets";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const CategoryPage = (props) => {
  const history = useHistory();

  return (
    <Grid bg="#CCC">
      <Navbar is_flex>
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
          onClick={() => window.location.replace("/main")}
        ></ArrowBackIosIcon>
        <Text bold size="20px" padding="0 0 0 10px">
          카테고리
        </Text>
      </Navbar>
      <Grid bg="white" height="92%" fixed top="8%" padding="0px 32px" scroll>
        <Grid height="16%" space_around>
          <Div>
            <IconButton
              onClick={() => history.push(`/category/${"디지털기기"}`)}
            >
              <ComputerIcon sx={{ fontSize: 45 }}></ComputerIcon>
            </IconButton>
            <Text>디지털기기</Text>
          </Div>

          <Div>
            <IconButton onClick={() => history.push(`/category/${"생활가전"}`)}>
              <KitchenIcon sx={{ fontSize: 45 }}></KitchenIcon>
            </IconButton>
            <Text>생활가전</Text>
          </Div>

          <Div>
            <IconButton
              onClick={() => history.push(`/category/${"가구&인테리어"}`)}
            >
              <LightIcon sx={{ fontSize: 45 }}></LightIcon>
            </IconButton>
            <Text>가구/인테리어</Text>
          </Div>
        </Grid>

        <Grid height="16%" space_around>
          <Div>
            <IconButton onClick={() => history.push(`/category/${"유아동"}`)}>
              <StrollerIcon sx={{ fontSize: 45 }}></StrollerIcon>
            </IconButton>
            <Text>유아동</Text>
          </Div>

          <Div>
            <IconButton
              onClick={() => history.push(`/category/${"생활&가공식품"}`)}
            >
              <CountertopsIcon sx={{ fontSize: 45 }}></CountertopsIcon>
            </IconButton>
            <Text>생활/가공식품</Text>
          </Div>

          <Div>
            <IconButton onClick={() => history.push(`/category/${"유아도서"}`)}>
              <MenuBookIcon sx={{ fontSize: 45 }}></MenuBookIcon>
            </IconButton>
            <Text>유아도서</Text>
          </Div>
        </Grid>
        <Grid height="16%" space_around>
          <Div>
            <IconButton
              onClick={() => history.push(`/category/${"스포츠&레저"}`)}
            >
              <SportsHandballIcon sx={{ fontSize: 45 }}></SportsHandballIcon>
            </IconButton>
            <Text>스포츠/레저</Text>
          </Div>

          <Div>
            <IconButton onClick={() => history.push(`/category/${"여성패션"}`)}>
              <WomanIcon sx={{ fontSize: 45 }}></WomanIcon>
            </IconButton>
            <Text>여성패션</Text>
          </Div>

          <Div>
            <IconButton onClick={() => history.push(`/category/${"남성패션"}`)}>
              <ManIcon sx={{ fontSize: 45 }}></ManIcon>
            </IconButton>
            <Text>남성패션</Text>
          </Div>
        </Grid>

        <Grid height="16%" space_between>
          <Div onClick={() => history.push(`/category/${"게임&취미"}`)}>
            <IconButton>
              <SportsEsportsIcon sx={{ fontSize: 45 }}></SportsEsportsIcon>
            </IconButton>
            <Text>게임/취미</Text>
          </Div>

          <Div>
            <IconButton
              onClick={() => history.push(`/category/${"뷰티&미용"}`)}
            >
              <ShowerIcon sx={{ fontSize: 45 }}></ShowerIcon>
            </IconButton>
            <Text>뷰티/미용</Text>
          </Div>

          <Div>
            <IconButton
              onClick={() => history.push(`/category/${"반려동물용품"}`)}
            >
              <PetsIcon sx={{ fontSize: 45 }}></PetsIcon>
            </IconButton>
            <Text>반려동물용품</Text>
          </Div>
        </Grid>

        <Grid height="16%" space_around>
          <Div>
            <IconButton
              onClick={() => history.push(`/category/${"도서&티켓&음반"}`)}
            >
              <MusicNoteIcon sx={{ fontSize: 45 }}></MusicNoteIcon>
            </IconButton>
            <Text>도서/티켓/음반</Text>
          </Div>

          <Div>
            <IconButton onClick={() => history.push(`/category/${"기타"}`)}>
              <InventoryIcon sx={{ fontSize: 45 }}></InventoryIcon>
            </IconButton>
            <Text>기타</Text>
          </Div>

          <Div>
            <IconButton onClick={() => history.push(`/category/${"삽니다"}`)}>
              <ShoppingBasketIcon sx={{ fontSize: 45 }}></ShoppingBasketIcon>
            </IconButton>
            <Text>삽니다</Text>
          </Div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CategoryPage;

const Div = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
