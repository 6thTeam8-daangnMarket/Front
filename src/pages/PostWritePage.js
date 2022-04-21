import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Text2 from "../elements/Text2";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as PostActions } from "../redux/modules/post";

const PostWritePage = () => {
  const cateRef = React.useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const userLocation = useSelector(state => state.user?.location);
  const [image, setImage] = React.useState(""); //preview

  const [imageUrl, setImageUrl] = React.useState(""); //보내는 image
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState(0);

  const reader = new FileReader();

  const encodeFileToBase64 = (fileBlob) => {
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
      };
    });
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };
  const changePrice = (e) => {
    setPrice(e.target.value);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeCategory = (e) => {
    setCategory(e.target.value);
  };
  const changeImageUrl = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const submit = () => {
    if (
      imageUrl === "" ||
      title === "" ||
      category === "" ||
      content === "" ||
      price === ""
    ) {
      alert("모든 사항을 기입해주세요.");
      return;
    } else {
      dispatch(PostActions.addPost(imageUrl, title, category, content, price));
    }
  };
  return (
    <PostWrite>
      <PostHeader>
        <Button
          variant="text"
          style={{
            color: "black",
            fontSize: "25px",
            fontWeight: "300",
            lineHeight: "2",
          }}
          onClick={() => history.push("/main")}
        >
          x
        </Button>
        <Text2
          fontSize="22px"
          lineHeight= "2.5em"
          fontWeight="1000"
          style={{ fontFamily: "AppleSDGothicNeoM" }}
        >
          중고거래 글쓰기
        </Text2>
        <Button
          variant="text"
          style={{
            color: "#FF9F57",
            fontSize: "23px",
            fontWeight: "600",
            lineHeight: "2",
          }}
          onClick={() => submit()}
        >
          완료
        </Button>
      </PostHeader>
      <Hr />
      <PostBody>
        {/* FormData */}
        <form id="postForm" name="postForm" style={{height: "100%"}}>
          <ImageUpload>
            {/* 이미지 업로드 */}
            <label htmlFor="image"><img src={process.env.PUBLIC_URL + "/다운로드.png"} style={{width:"100px", height:"100px", margin:"10px"}}/></label>
            <input
              id="image"
              name="image"
              type="file"
              style={{display:"none"}}
              onChange={(e) => {
                changeImageUrl(e);
                encodeFileToBase64(e.target.files[0]);
              }}
            />
            {/* 미리보기 */}
            <div style={{ width: "100px", height: "100px", margin:"10px"}}>
              {image && (
                <img
                  src={image}
                  alt="preview-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                  }}
                />
              )}
            </div>
          </ImageUpload>
          <DetailWrap>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="글 제목"
              style={{
                fontSize: "1.1em",
                height: "100%",
                width: "100%",
                border: "1px solid #FAFAFA",
                boxSizing: "border-box",
                border: "1px solid #FAFAFA",
                padding: "15px",
              }}    
              onChange={changeTitle}
            />
          </DetailWrap>
          {/* 카테고리 설정 */}
          <DetailWrap>
            <select name="category" id="category" 
            style={{
              padding: "0 10px",
              marginRight: "10px",
              width: "96%",
              height: "100%",
              border: "1px solid #FAFAFA",
              fontSize: "1em",
            }}
            onChange={changeCategory}>
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
              style={{
                height:"100%",
                border: "1px solid #FAFAFA",
                fontSize: "1em",
                boxSizing: "border-box",
              }}
              onChange={changePrice}
            />
            <label htmlFor="price" />
            <div style={{ 
              float: "right",
                float: "right",
                display: "flex",
                height: "100%",
                alignItems: "center",
                marginRight: "10px",
                }}>
              {/* 가격 제안받기 */}
              <input
                name="priceOffer"
                id="priceOffer"
                type="checkbox"
                value="priceOffer"
                disabled
                style={{marginRight: "7px"}}
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
              style={{ height: "98%", border: "1px solid #FAFAFA",fontSize: "20px", width: "100%", boxSizing: "border-box", padding:"10px"}}
              placeholder={`${userLocation}의 게시글 내용을 작성해주세요. (가품 및 판매금지품목은 게시가 제한될 수 있어요.)`}
              onChange={changeContent}
            ></textarea>
          </ContentsWrap>
        </form>
      </PostBody>
      <PostFooter>
        <Button variant="text" style={{ color: "grey", fontSize: "1em" }}>
          <CommentOutlinedIcon style={{ marginRight: "5px" }} /> 자주 쓰는 문구{" "}
        </Button>
        <Button variant="text" style={{ color: "grey", fontSize: "1em" }}>
          <LocationOnOutlinedIcon style={{ marginRight: "5px" }} /> 보여줄 동네
          설정{" "}
        </Button>
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
  height: 8%;
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
  color: #f5f5f5;
`;
const ImageUpload = styled.div`
  height: 20%;
  width: 100%;
  display: flex;

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
  height: 12%;
  padding-top: 10px;
  padding-left: 10px;
  background-color: #fafafa;
`;
export default PostWritePage;
