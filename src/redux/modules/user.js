// 1. import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import jwt_decode from "jwt-decode";
import { api } from "../../shared/api";

// 2. actions(액션 타입)
// const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
// const SET_PROFILE = "SET_PROFILE";
// const SET_PREVIEW = "SET_PREVIEW";
const LOG_OUT = "LOG_OUT";
// const LOGGEDIN = "LOGGEDIN";

// 3. action creators (액션 생성 함수)
// const loggedin =  createAction(LOGGEDIN, (token) => ({ token }));
const setUser = createAction(SET_USER, (user) => ({ user }));
// const getUser = createAction(GET_USER, (user) => ({ user }));
// const setProfile = createAction(SET_PROFILE, (image) => ({ image }));
// const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// 4. initialState 초기값 설정
const initialState = {
  userId: null, // 서버에서 받아올 값
  userName: null, // id
  nickName: null,
  location: null,
  is_login: false,
};

const signUp = (id, nickName, location, pw, pwCheck) => {
  return function (dispatch, getState, { history }) {
    console.log("아이디", id);
    console.log("닉네임", nickName);
    console.log("비밀번호", pw);
    console.log("pwCheck", pwCheck);

    api
      .post("/user/signUp", {
        userName: id,
        nickName: nickName,
        location: location,
        passWord: pw,
        passWordCheck: pwCheck,
      })
      .then((res) => {
        console.log(res);
        window.alert("회원가입이 완료되었습니다. 로그인해주세요!");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 로그인
const logIn = (id, pw) => {
  return function (dispatch, getState, { history }) {
    console.log(id, pw);
    api
      .post("/user/logIn", {
        userName: id,
        passWord: pw,
      })
      .then((data) => {
        console.log(data);
        // 로컬스토리지에 token 저장
        localStorage.setItem("token", data.headers.authorization);
        // localStorage.setItem("userInfo", data.data);

        dispatch(
          setUser({
            userId: data.data.userId,
            userName: data.data.userName,
            nickName: data.data.nickName,
            location: data.data.location,
            // userProfile: data.data.userProfile,
          })
        );
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 4.3. isLogin
const isLogin = (Token) => {
  return function (dispatch, getState, { history }) {
    const token = localStorage.getItem("token");

    api
      .get("/user/isLogIn", {
        headers: {
          Authorization: ` ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const userId = res.data.userId;
        const userName = res.data.userName;
        const nickName = res.data.nickName;
        const location = res.data.location;
        dispatch(
          setUser({
            userId,
            userName,
            nickName,
            location,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 4.4.2. 마이페이지_내가 쓴 글 불러오기
// export const mylikeAPI = () => {
//   const token = localStorage.getItem("token");

//   return function (dispatch, getState, { history }) {
//     api
//       .get(`/mypage/mypost`, {
//         headers: {
//           Authorization: `${token}`,
//         },
//       })
//       .then((res) => {
//         dispatch(setPost(res.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// 5. 로그아웃
const logout = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    // localStorage.removeItem("userInfo");

    dispatch(logOut());
    history.replace("/");
  };
};

// 5. reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.user.userId;
        draft.userName = action.payload.user.userName;
        draft.nickName = action.payload.user.nickName;
        draft.location = action.payload.user.location;
        draft.is_login = true;
      }),

    // [GET_USER]: (state, action) => produce(state, (draft) => {}),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.userName = null;
        draft.is_login = false;
      }),

      // [LOGGEDIN] : (state, action) => produce (state, (draft) => {
      //   const token = action.payload.token;
      //   let decoded = jwt_decode(token);
      //   console.log(decoded);
        
      //   draft.nickName= decoded.NICK_NAME;
      //   draft.userName= decoded.USER_NAME;
        
      //   draft.is_login = true;
      // }),
  },
  initialState
);

// action creator export
const actionCreators = {
  signUp,
  logIn,
  isLogin,
  setUser,

  // mypostAPI,
  logout,

  // loggedin,
};

export { actionCreators };
