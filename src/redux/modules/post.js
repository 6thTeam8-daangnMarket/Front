// Action 과 Reducer 사용을 편하게 하기 위한 패키지
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //immer : 불변성 관리
import moment from "moment"; // Date객체와 유사
import { api } from "../../shared/api";
import axios from "axios"; //axios: node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트

//Actions
const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST"; //전체
const GET_A_POST = "GET_A_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

//reducer이 사용할 initialState
const initialState = {
  post_list: [],
  post: null,
};
// 게시글 하나에 대한 default initial 값
const initialPost = {
  postTitle: "게시글 제목2",
  postContents: "게시글 내용",
  imageUrl: "이미지 Url",
  price: 3000,
  category: "전자제품",
};
//actionCreators
const add_post = createAction(ADD_POST, (post) => ({ post }));
const set_post = createAction(SET_POST, (posts) => ({ posts }));
const get_a_post = createAction(GET_A_POST, (post) => ({ post }));
const delete_post = createAction(DELETE_POST, () => ({}));
const update_post = createAction(UPDATE_POST, (post) => ({ post }));
const getPost = () => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/api/posted/1`)
      .then((res) => {
        console.log(res.data);
        dispatch(set_post(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getAPost = (postId) => {
  return function (dispatch, getState, { history }) {
    const postID = parseInt(postId);

    api
      .get(`/api/posts/${postID}`)
      .then((res) => {
        console.log(res.data);
        dispatch(get_a_post(res.data));
      })
      .catch((err) => {
        console.log(err);
        window.alert("게시물을 불러오지 못하였습니다.");
      });
  };
};

const search = (searchWord) => {
  return function (dispatch, getState, { history }) {
    api
      .post(`/api/search/${searchWord}`, {
        data: {
          searchWord: searchWord,
        },
      })
      .then((post_list) => {
        dispatch(set_post(post_list));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addPost = (imageUrl, title, category, content, price) => {
  const formData = new FormData();
  formData.append("postTitle", title);
  formData.append("category", category);
  formData.append("postContents", content);
  formData.append("price", price);
  formData.append("imageUrl", imageUrl);
  return async function (dispatch, getState, { history }) {
    try {
      await axios.post(
        "http://3.36.77.41/api/write",
        formData,
        {
          // await axios.post("http:///api/write",formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      );
      window.alert("게시글 작성을 성공하였습니다.");
      history.replace("/");
    } catch (err) {
      window.alert("게시글 작성에 실패하였습니다.");
      console.log(err);
      return;
    }
  };
};

const deletePost = (token, postId) => {
  console.log(token, postId);
  return async function (dispatch, getState, { history }) {
    try {
      const response = await api.deletePost(token, parseInt(postId));
      if (response === "OK") {
        window.alert("게시글 삭제를 성공하였습니다.");
        history.replace("/");
      }
    } catch (err) {
      console.log(err);
      window.alert("게시글 삭제를 실패하였습니다.");
    }
  };
};

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.posts;
      }),
    [GET_A_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
        console.log(action.payload.post);
      }),
    [UPDATE_POST]: (state, action) => produce(state, (draft) => {}),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.filter(!action.payload.post);
      }),
  },
  initialState
);
//export
const actionCreators = {
  addPost,
  search,
  getPost,
  getAPost,
  deletePost,
};
export { actionCreators };
