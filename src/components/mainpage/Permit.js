import React from "react";
import { useSelector } from "react-redux";

const Permit = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  console.log(is_login);

  const token = localStorage.getItem("token") ? true : false;
  console.log(token);

  if (is_login && token) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export default Permit;
