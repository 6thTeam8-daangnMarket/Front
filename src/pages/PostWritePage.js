import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Text2 from "../elements/Text2";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const PostWritePage = () => {
  const cateRef = React.useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState(0);

  const formData = new FormData();

  const changeContent = (e) => {
    setContent(e.target.value);
  };
  const changePrice = (e) => {
    setPrice(e.target.value);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeCategory = (category) => {
    setCategory(category.value);
  };
  const submit = () => {};
  return (
    <PostWrite>
      <PostHeader>
        <Button
          variant="text"
          style={{
            color: "black",
            fontSize: "30px",
            fontWeight: "300",
            lineHeight: "1",
          }}
          onClick={() => history.push("/")}
        >
          x
        </Button>
        <Text2
          fontSize="25px"
          style={{ lineHeight: "1.75", fontFamily: "AppleSDGothicNeoM" }}
        >
          중고거래 글쓰기
        </Text2>
        {/* <Button variant="text" style={{color:"#FF9F57", fontSize: "23px", fontWeight: "600", lineHeight: "1"}}
        onClick={()=>{submit}}>완료</Button> */}
      </PostHeader>{" "}
      <Hr />
      <PostBody>
        {/* FormData */}
        <form id="postForm" name="postForm">
          <ImageUpload>
            {/* 이미지 업로드 */}
            <label htmlFor="image"></label>
            <input id="image" name="image" type="file" />
            {/* 미리보기 */}
            {/* <img src={image} style={{width: "100px", height:"100px"}}></img> */}
          </ImageUpload>
          <DetailWrap>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="글 제목"
              onChange={changeTitle}
            />
          </DetailWrap>
          {/* 카테고리 설정 */}
          <DetailWrap>
            <select name="category" cateRef={changeCategory} id="category">
              <option value="none">카테고리 선택</option>
              <option value="디지털기기">디지털기기</option>
              <option value="생활가전">생활가전</option>
              <option value="가구/인테리어">가구/인테리어</option>
              <option value="유아동">유아동</option>
              <option value="생활/가공식품">생활/가공식품</option>
              <option value="유아도서">유아도서</option>
              <option value="스포츠/레저">스포츠/레저</option>
              <option value="여성패션">여성패션/잡화</option>
              <option value="남성패션">남성패션/잡화</option>
              <option value="게임/취미">게임/취미</option>
              <option value="뷰티/미용">뷰티/미용</option>
              <option value="반려동물용품">반려동물용품</option>
              <option value="도서/티켓/음반">도서/티켓/음반</option>
              <option value="기타">기타 중고물품</option>
              <option value="삽니다">삽니다</option>
            </select>
          </DetailWrap>
          <DetailWrap>
            {/* 가격 설정 */}
            <span className="prefix">₩</span>
            <input
              id="price"
              name="price"
              className="has-prefix"
              type="number"
              placeholder="가격 (선택사항)"
              onChange={changePrice}
            />
            <label htmlFor="price" />
            <div style={{ float: "right" }}>
              {/* 가격 제안받기 */}
              <input
                name="priceOffer"
                id="priceOffer"
                type="radio"
                value="priceOffer"
              />
              <label htmlFor="priceOffer">가격 제안받기</label>
            </div>
          </DetailWrap>
          <ContentsWrap>
            {/* 게시글 내용 */}
            <label htmlFor="content" />
            <textarea
              name="content"
              id="content"
              className="content"
              rows="10"
              style={{ fontSize: "20px", width: "97%" }}
              placeholder="ㅇㅇ동에 올릴 게시글 내용을 작성해주세요. (가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
              onChange={changeContent}
            ></textarea>
          </ContentsWrap>
        </form>
      </PostBody>
      <Hr />
      <PostFooter>
        <Button variant="text"> 자주 쓰는 문구 </Button>
        <Button variant="text"> 보여줄 동네 설정 </Button>
      </PostFooter>
    </PostWrite>
  );
};
const PostWrite = styled.div`
  width: 100vw;
  height: 100vh;
`;
const PostHeader = styled.div`
  width: 100%;
  height: 10%;
  text-align: center;
  display: flex;
  align-items: end;
  justify-content: space-between;
`;
const PostBody = styled.div`
  width: 100%;
  height: 80%;
  font-size: 20px;
`;
const Hr = styled.hr`
  color: lightgrey;
`;
const ImageUpload = styled.div`
  height: 20%;
  width: 100%;
`;
const DetailWrap = styled.div`
  width: 100%;
  height: 10%;
`;
const ContentsWrap = styled.div`
  width: 100%;
  height: 50%;
`;
const PostFooter = styled.div`
  width: 100%;
  height: 10%;
`;
export default PostWritePage;
