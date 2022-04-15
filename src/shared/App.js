import React from "react";
import "./App.css";

import { Route } from "react-router-dom"; // 경로설정및 이동을위해 꼭 필요함
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/store";

import Header from "../components/Header";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import MainPage from "../pages/MainPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostWritePage from "../pages/PostWritePage";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Header />
        <Route path="/" exact component={MainPage} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/post/detail/:postId" exact component={PostDetailPage} />
        <Route path="/post/write" exact component={PostWritePage} />
        <Route path="/signup" exact component={SignUpPage} />
      </ConnectedRouter>
    </>
  );
}

export default App;
