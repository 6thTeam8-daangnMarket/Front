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
const LOADING = "LOADING";

//reducer이 사용할 initialState
const initialState = {
  post_list: [],
  post: null,
  search_list: [],
  category_list: [],
  like_list: [],
  page: 1,
  has_next: null,
  is_loading: false,
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
const get_post = createAction(GET_POST, (post_data) => ({ post_data }));
const get_a_post = createAction(GET_A_POST, (post) => ({ post }));
const delete_post = createAction(DELETE_POST, () => ({}));
const update_post = createAction(UPDATE_POST, (post) => ({ post }));
const get_search_post = createAction(GET_SEARCH_POST, (posts) => ({ posts }));
const get_category_post = createAction(GET_CATEGORY_POST, (posts) => ({
  posts,
}));
const get_like_post = createAction(GET_LIKE_POST, (posts) => ({ posts }));
const change_like_count = createAction(CHANGE_LIKE_COUNT, (like) => ({ like }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//무한스크롤 위해서 인자로 보내야할 값 넣어야 함
const getPost = (page) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));

    // let is_loading = getState().post.is_loading;
    // console.log(is_loading);
    api
      .get(`/api/posted/${page}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.postList);
        console.log(res.data.postList.length);
        let has_next = null;
        if (res.data.postList.length < 10) {
          has_next = false;
        } else {
          has_next = true;
        }
        let post_data = {
          post_list: res.data.postList,
          page: page + 1,
          has_next: has_next,
        };
        dispatch(get_post(post_data));
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
  return function (dispatch) {
    console.log(keyword);
    api
      .get(`/api/search/${keyword}`)
      .then((res) => {
        console.log(res.data);
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
        console.log(res.data);
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
      .get("/user/mypage/1", {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.likeposts);

        dispatch(get_like_post(res.data.likeposts));
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
      history.replace("/main");
    } catch (err) {
      window.alert("게시글 작성에 실패하였습니다.");
      console.log(err);
      return;
    }
  };
};

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
        history.replace("/main");
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
      .post(
        `/api/posts/${postID}/like`,
        {},
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
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
        draft.post_list.push(...action.payload.post_data.post_list);
        draft.page = action.payload.post_data.page;
        draft.has_next = action.payload.post_data.has_next;
        draft.is_loading = false;
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

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
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
  changeLikeCnt,
  getSearch,
  getCategory,
  getLike,
};
export { actionCreators };
