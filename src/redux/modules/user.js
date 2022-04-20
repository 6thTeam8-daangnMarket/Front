// 1. import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/api";

// 2. actions(액션 타입)
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

// 3. action creators (액션 생성 함수)
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));

// 4. initialState 초기값 설정
const initialState = {
  userId: null,
  userName: null,
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

        dispatch(setUser({}));
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
    console.log(Token);
    api
      .get("/user/isLogIn", {
        headers: {
          Authorization: ` ${Token}`,
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

    dispatch(logOut());
    window.alert("로그아웃이 완료되었습니다!");
    history.push("/");
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

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.userName = null;
        draft.is_login = false;
      }),
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
};

export { actionCreators };
