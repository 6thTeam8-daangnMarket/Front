// Action 과 Reducer 사용을 편하게 하기 위한 패키지
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //immer : 불변성 관리
// import moment from "moment"; // Date객체와 유사
import { api } from "../../shared/api";
import axios from "axios"; //axios: node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트

//Actions
const ADD_POST = "ADD_POST";
const GET_POST = "SET_POST";
const GET_A_POST = "GET_A_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const GET_SEARCH_POST = "GET_SEARCH_POST";
const GET_CATEGORY_POST = "GET_CATEGORY_POST";
const GET_LIKE_POST = "GET_LIKE_POST";

const CHANGE_LIKE_COUNT = "CHANGE_LIKE_COUNT";

//reducer이 사용할 initialState
const initialState = {
  post_list: [],
  post: null,
  search_list: [],
  category_list: [],
  like_list: [],
};
// 게시글 하나에 대한 default initial 값
const initialPost = {
  postTitle: "게시글 제목2",
  postContents: "게시글 내용",
  imageUrl: "이미지 Url",
  price: 3000,
  category: "전자제품",
  likeCount: "0",
};
//actionCreators
const add_post = createAction(ADD_POST, (post) => ({ post }));
const get_post = createAction(GET_POST, (posts) => ({ posts }));
const get_a_post = createAction(GET_A_POST, (post) => ({ post }));
const delete_post = createAction(DELETE_POST, () => ({}));
const update_post = createAction(UPDATE_POST, (post) => ({ post }));
const get_search_post = createAction(GET_SEARCH_POST, (posts) => ({ posts }));
const get_category_post = createAction(GET_CATEGORY_POST, (posts) => ({
  posts,
}));
const get_like_post = createAction(GET_LIKE_POST, (posts) => ({ posts }));
const change_like_count = createAction(CHANGE_LIKE_COUNT, (like) => ({ like }));

//무한스크롤 위해서 인자로 보내야할 값 넣어야 함
const getPost = () => {
  return function (dispatch, getState, { history }) {

    api //username.보내주기 . 회원아니면 Null
      .get(`/api/posted/1`,{
        headers: {
          "content-type": "application/json;charset=UTF-8",
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
      { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        dispatch(get_post(res.data));
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

const getSearch = (keyword) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/api/search/${keyword}`)
      .then((res) => {
        dispatch(get_search_post(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getCategory = (category) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/api/category/${category}`)
      .then((res) => {
        dispatch(get_category_post(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getLike = () => {
  return function (dispatch, getState, { history }) {
    api
      .get("/user/myPage")
      .then((res) => {
        dispatch(get_like_post(res.data));
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
        "http://3.38.117.7/api/write",
        formData,
        {
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

const updatePost = (imageUrl, title, category, content, price, postId) => {
  const postID = parseInt(postId);
  const formData = new FormData();
  formData.append("postTitle", title);
  formData.append("category", category);
  formData.append("postContents", content);
  formData.append("price", price);
  formData.append("imageUrl", imageUrl);
  return async function (dispatch, getState, { history }) {
    try {
      await axios.post(
        `http://3.38.117.7/api/posts/${postID}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      );
      window.alert("게시글 수정을 성공하였습니다.");
      history.replace("/");
    } catch (err) {
      window.alert("게시글 수정에 실패하였습니다.");
      console.log(err);
      return;
    }
  };
}




const deletePost = (postId) => {
  const postID = parseInt(postId);
  return async function (dispatch, getState, { history }) {
    api
      .delete(`/api/posts/${postID}`, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        window.alert("게시글 삭제를 성공하였습니다.");
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("게시글 삭제를 실패하였습니다.");
      });
  };
};

const changeLikeCnt = (postId) => {
  const postID = parseInt(postId);
  return function (dispatch, getState, { history }) {
    api
      .post(`/api/posts/${postID}/like`, {}, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        window.alert("관심상품으로 등륵되었습니다.");
      })
      .catch((err) => {
        console.log(err);
        window.alert("관심상품 등록을 실패하였습니다.");
        return;
      });
  };
};

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.posts;
      }),
    [GET_A_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
        console.log(action.payload.post);
      }),

    [CHANGE_LIKE_COUNT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.post_liked = action.payload.result;
      }),
    [UPDATE_POST]: (state, action) => produce(state, (draft) => {}),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.filter(!action.payload.post);
      }),
    [GET_SEARCH_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list = action.payload.posts;
      }),
    [GET_CATEGORY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.category_list = action.payload.posts;
      }),
    [GET_LIKE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.like_list = action.payload.posts;
      }),
  },
  initialState
);
//export
const actionCreators = {
  addPost,
  getPost,
  getAPost,
  deletePost,
  updatePost,
  changeLikeCnt,
  getSearch,
  getCategory,
  getLike,
};
export { actionCreators };
