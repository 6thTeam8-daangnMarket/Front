import React, { useEffect } from "react";
import {useCallback} from"react";
import _ from "lodash";

const Scroll = (props) => {
    const {children, is_next, loading, callNext} = props;

    const _handleScroll = _.throttle(() => {
        if(loading){
            return;
        }
        callNext();
    }, 300);

    const handleScroll = React.useCallback(_handleScroll,[loading]);
    React.useEffect (() => {
        if(loading) { // 로딩중에는 
            return;
        } if(is_next) {
            window.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("scroll", handleScroll);
        } return () => window.removeEventListener("scroll", handleScroll);
    },[is_next, loading]);
    return (
        <React.Fragment>
            {props.children};
        </React.Fragment>
    )
}

Scroll.defaultProps = {
    is_next : false,
    loading : false,
    children : null,
    callNext : () => {},
}
export default Scroll;