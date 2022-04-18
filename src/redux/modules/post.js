// Action 과 Reducer를 편하게 사용하도록하는 함수
import { createAction, handleActions } from "redux-actions";
// 불변성 관리를 편한게 해주는 함수
import { produce } from "immer";
// Date객체처럼 날짜시간을 받아오는 함수
import moment from "moment";
import { api } from "../../shared/api";
import axios from "axios";

//Actions
const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

//reducer이 사용할 initialState
const initialState= {
  post_list: [],
  post: null,
}
// 게시글 하나에 대한 default initial 값
const initialPost = {
  postTitle:"게시글 제목2",
  postContents: "게시글 내용",
  imageUrl:"이미지 Url",
  price: 3000,
  category:"전자제품"
}
//actionCreators
const add_post = createAction(ADD_POST, (post)=> (post));
const set_post = createAction(SET_POST, (posts) => ({ posts }));
const delete_post = createAction(DELETE_POST, ()=>({}));
const update_post = createAction(UPDATE_POST, (post)=>({post}));

const getPost = () => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/api/posts`)
      .then((res) => {
        console.log(res.data.data); //[]
        dispatch(set_post(res.data.data));
        
      })
      .catch((err) => {
        console.log(err);
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
    return async function (dispatch, getState, {history}){
      try{
          await axios.post("http://3.36.77.41/api/write",formData, {
          // await axios.post("http:///api/write",formData, {
            headers: { 
              'content-type': "multipart/form-data", 
              Authorization: `${localStorage.getItem("token")}`
            },
          },
          { withCredentials: true }
          );
          window.alert('게시글 작성을 성공하였습니다.');
          history.replace('/');
      }
      catch(err){
        window.alert('게시글 작성에 실패하였습니다.')
        console.log(err);
        return;
      }
    }
}

const deletePost = (token, postId) => {
  return async function (dispatch, getState, {history}){
    try{
      const response = await api.deletePost(token, postId);
      if(response === "OK") {
        window.alert('게시글 삭제를 성공하였습니다.');
        history.replace('/');
      }
    }
    catch(err){
        console.log(err);
        window.alert('게시글 삭제를 실패하였습니다.');
    }
  }
} 

export default handleActions(
  {
      [ADD_POST] : (state, action) => produce (state, (draft) => {
          draft.list.unshift(action.payload.post);

      }),
      [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.posts;
      }),
      [UPDATE_POST] : (state, action) => produce (state, (draft) =>{

      }),
      [DELETE_POST] : (state, action) => produce (state, (draft) =>{

      }),
  }, initialState

)
//export 
const actionCreators = {
  addPost,
  search,
  getPost,
}
export { actionCreators };