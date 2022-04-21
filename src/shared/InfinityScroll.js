import React from "react";
import _ from "lodash";
import Spinner from "../elements/Spinner";

const InfinityScroll = (props) => {
  const { children, callNext, has_next, is_loading } = props;

  // console.log(callNext);
  // console.log(has_next);
  // console.log(is_loading);

  // 쓰로틀 적용
  const _handleScroll = _.throttle(() => {
    // const { innerHeight } = window;
    // const { scrollHeight } = document.body;

    // // 스크롤 계산
    // // 이해가 필요하다. 지금은 잘 모름
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    console.log(scrollTop);

    // if (scrollHeight - innerHeight - scrollTop < 200) {
    //   if (is_loading) {
    //     return;
    //   }
    // }

    // if (is_loading) {
    //   return;
    // }

    callNext();
    console.log("쓰로틀 테스트");
  }, 500);

  const handleScroll = React.useCallback(_handleScroll, []);

  React.useEffect(() => {
    if (is_loading) {
      return;
    }
    // 다음 페이지가 있으면 이벤트를 붙이고, 없으면 이벤트 삭제
    if (has_next) {
      window.addEventListener("scroll", handleScroll);
      console.log("이벤트 구독");
    } else {
      window.removeEventListener("scroll", handleScroll);
      console.log("이벤트 구독 해지");
    }

    // 컴포넌트가 사라질 때 호출되는 부분. (클린 업)
    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("클린업 실행");
    };
  }, [has_next, is_loading]);

  return (
    <React.Fragment>
      {children}
      {/* {has_next && <Spinner />} */}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  // callNext: () => {},
  // has_next: false,
  // loading: false,
};

export default InfinityScroll;
