// Action 과 Reducer 사용을 편하게 하기 위한 패키지
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //immer : 불변성 관리
// import moment from "moment"; // Date객체와 유사
import { api } from "../../shared/api";
import axios from "axios"; //axios: node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트

//Actions
const ADD_POST = "ADD_POST";
const GET_FIRST_POSTLIST = "GET_FIRST_POSTLIST";
const GET_NEXT_POSTLIST = "GET_NEXT_POSTLIST";
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
  paging: {
    start: null,
    next: null,
    lastPage: false,
  },
  is_loading: false,
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
const get_first_postlist = createAction(GET_FIRST_POSTLIST, (posts) => ({
  posts,
}));
const get_next_postlist = createAction(GET_NEXT_POSTLIST, (posts) => ({
  posts,
}));

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
    console.log(page);
    dispatch(loading(true));
    api //username.보내주기 . 회원아니면 Null
      .get(
        `/api/posted/${page}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      )
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
const getFirstPostList = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    try {
      const response = api //username.보내주기 . 회원아니면 Null
        .get(
          `/api/posted/1`,
          {
            headers: {
              "content-type": "application/json;charset=UTF-8",
              Authorization: `${localStorage.getItem("token")}`,
            },
          },
          { withCredentials: true }
        );
      let paging = {
        start: 2,
        next: 3,
        lastPage: response.data.totalPage === 1 ? true : false,
      };
      if (response.status === 200) {
        dispatch(getFirstPostList(response.data.postList, paging));
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };
};
const getNextPostList = (page) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    try {
      const response = api //username.보내주기 . 회원아니면 Null
        .get(
          `/api/posted/${page}`,
          {
            headers: {
              "content-type": "application/json;charset=UTF-8",
              Authorization: `${localStorage.getItem("token")}`,
            },
          },
          { withCredentials: true }
        );
      let paging = {
        start: page + 1,
        next: page + 2,
        lastPage: response.data.totalPage === page ? true : false,
      };
      if (response.status === 200) {
        dispatch(getNextPostList(response.data.postList, paging));
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };
};
const getAPost = (postId) => {
  return function (dispatch, getState, { history }) {
    const postID = parseInt(postId);
    api
      .get(
        `/api/posts/${postID}`,
        {
          headers: {
            "content-type": "application/json;charset=UTF-8",
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      )
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

const getSearch = (keyword, page) => {
  return function (dispatch) {
    dispatch(loading(true));
    console.log(keyword);
    api
      .get(
        `/api/search/${keyword}/${page}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      )
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
        dispatch(get_search_post(post_data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const getCategory = (category, page) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    api
      .get(
        `/api/category/${category}/${page}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      )
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
        dispatch(get_category_post(post_data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const getLike = (page) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    api
      .get(
        `/user/mypage/${page}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data.likeposts);
        console.log(res.data.likeposts.length);
        let has_next = null;
        if (res.data.likeposts.length < 10) {
          has_next = false;
        } else {
          has_next = true;
        }
        let post_data = {
          post_list: res.data.likeposts,
          page: page + 1,
          has_next: has_next,
        };
        dispatch(get_like_post(post_data));
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
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      );
      window.alert("게시글 작성을 성공하였습니다.");
      window.location.replace("/main");
    } catch (err) {
      window.alert("게시글 작성에 실패하였습니다.");
      console.log(err);
      return;
    }
  };
};

const updatePost = (imageUrl, title, content, price, category, postId) => {
  const postID = parseInt(postId);
  console.log(imageUrl, title, content, price, category, postId);

  const formData = new FormData();
  formData.append("postTitle", title);
  formData.append("category", category);
  formData.append("postContents", content);
  formData.append("price", price);
  formData.append("imageUrl", imageUrl);
  return async function (dispatch, getState, { history }) {
    try {
      await axios.put(
        `http://3.36.77.41/api/posts/${postID}`,
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
      window.location.replace("/main");
    } catch (err) {
      window.alert("게시글 수정에 실패하였습니다.");
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
        if (res.data.result === true) {
          window.alert("관심상품으로 등륵되었습니다.");
        } else {
          window.alert("관심상품을 취소하였습니다.");
        }

        window.location.reload();
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
        draft.post_list.unshift(action.payload.post);
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = [
          ...state.post_list,
          ...action.payload.post_data.post_list,
        ];
        draft.page = action.payload.post_data.page;
        draft.has_next = action.payload.post_data.has_next;
        draft.is_loading = false;
      }),
    [GET_FIRST_POSTLIST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.post_list = action.payload.postList;
        draft.paging.lastPage = action.payload.paging.lastPage;
        draft.is_loading = false; // 로딩이 다되었으니까 false로 바꿔줘 다시
      }),
    [GET_NEXT_POSTLIST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.post_list.push(...action.payload.postList);
        draft.paging = action.payload.paging;
        draft.is_loading = false; // 로딩이 다되었으니까 false로 바꿔줘 다시
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
    [UPDATE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post);
        draft.post_list.post.map((x) => {
          if (x.postId === action.payload.post.postId) {
            x.post = action.payload.post;
          }
        });
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list.filter(!action.payload.post);
      }),
    [GET_SEARCH_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list.push(...action.payload.posts.post_list);
        draft.page = action.payload.posts.page;
        draft.has_next = action.payload.posts.has_next;
        draft.is_loading = false;
      }),
    [GET_CATEGORY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.category_list.push(...action.payload.posts.post_list);
        draft.page = action.payload.posts.page;
        draft.has_next = action.payload.posts.has_next;
        draft.is_loading = false;
      }),
    [GET_LIKE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.like_list.push(...action.payload.posts.post_list);
        draft.page = action.payload.posts.page;
        draft.has_next = action.payload.posts.has_next;
        draft.is_loading = false;
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
  updatePost,
  changeLikeCnt,
  getSearch,
  getCategory,
  getLike,
  getFirstPostList,
  getNextPostList,
};
export { actionCreators };
