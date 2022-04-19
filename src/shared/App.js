import React from "react";
import "./App.css";
import { Route } from "react-router-dom"; // 경로설정및 이동을위해 꼭 필요함
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/store";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import MainPage from "../pages/MainPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostWritePage from "../pages/PostWritePage";
import SearchPage from "../pages/SearchPage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";
import { useEffect } from "react";
import { useParams } from "react-router";

function App() {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const Token = localStorage.getItem("token");

  // const params = useParams();
  // const postId = Number(params.postId);

  useEffect(() => {
    if (Token) {
      dispatch(userActions.isLogin(localStorage.getItem("token")));
    }
  }, []);

  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={MainPage} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/post/detail/:postId" exact component={PostDetailPage} />
        <Route path="/post/write" exact component={PostWritePage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/signup" exact component={SignUpPage} />
      </ConnectedRouter>
    </>
  );
}

export default App;
