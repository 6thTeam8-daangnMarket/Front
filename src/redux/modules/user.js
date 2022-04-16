// 1. import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/api";

// 2. actions(액션 타입)
// const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
// const SET_PROFILE = "SET_PROFILE";
// const SET_PREVIEW = "SET_PREVIEW";
const LOG_OUT = "LOG_OUT";

// 3. action creators (액션 생성 함수)
const setUser = createAction(SET_USER, (user) => ({ user }));
// const getUser = createAction(GET_USER, (user) => ({ user }));
// const setProfile = createAction(SET_PROFILE, (image) => ({ image }));
// const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// 4. initialState 초기값 설정
const initialState = {
  userId: null, // 서버에서 받아올 값
  username: null, // id
  nickname: null,
  is_login: false,
};

// 4. 미들웨어
// 4.1. 회원가입
// const signupAPI = (id, nickname, pw) => {
//   return function (dispatch, getState, { history }) {
//     console.log("아이디", id);
//     console.log("닉네임", nickname);
//     console.log("비밀번호", pw);

//     api
//       .post("/user/signup", {
//         username: id,
//         nickname: nickname,
//         password: pw,
//       })
//       .then((res) => {
//         console.log(res);
//         window.alert("회원가입이 완료되었습니다. 로그인해주세요!");
//         history.push("/login");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// 4.2. 로그인
const loginAPI = (id, pw) => {
  return function (dispatch, getState, { history }) {
    console.log(id, pw);
    api
      .post("/user/login", {
        username: id,
        password: pw,
      })
      .then((data) => {
        console.log(data);
        // 로컬스토리지에 token 저장
        localStorage.setItem("token", data.headers.authorization);
        localStorage.setItem("userInfo", data.data);
        // localStorage.setItem("userId", data.data.userId);
        // localStorage.setItem("username", data.data.usernamel);
        // localStorage.setItem("email", data.data.email);
        // localStorage.setItem("nickname", data.data.nickname);
        // localStorage.setItem("userProfile", data.data.userProfile);

        dispatch(
          setUser({
            userId: data.data.userId,
            username: data.data.username,
            email: data.data.email,
            nickname: data.data.nickname,
            userProfile: data.data.userProfile,
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
// const isLogin = () => {
//   return function (dispatch, getState, { history }) {
//     const token = localStorage.getItem("token");
//     const userInfo = localStorage.getItem("userInfo");

//     // 토큰이 없거나 유저아이디가 없거나 둘 중 하나면 로그인이 아님
//     if (!token) {
//       dispatch(logout());
//     }
//     console.log(token);
//     console.log(userInfo);
//     dispatch(
//       // 어딘가에서 setUser 를 위한 정보를 가지고 와야 함. 토큰에 이 정보 있는지 확인 필요
//       setUser({

//       })
//     );
//   };
// };

// 4.4.2. 마이페이지_내가 쓴 글 불러오기
// export const mypostAPI = () => {
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
    localStorage.removeItem("userInfo");

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
        draft.username = action.payload.user.username;
        draft.nickname = action.payload.user.nickname;
        draft.is_login = true;
      }),

    // [GET_USER]: (state, action) => produce(state, (draft) => {}),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.username = null;
        draft.is_login = false;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  // signupAPI,
  loginAPI,
  setUser,
  // isLogin,
  // mypostAPI,
  logout,
};

export { actionCreators };
