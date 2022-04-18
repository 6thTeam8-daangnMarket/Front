import axios from "axios";

export const api = axios.create(
  {
    baseURL: "http://3.36.77.41",
    //headers 이렇게 보내도 동일한가
    headers: {
      "content-type":  'application/json;charset=UTF-8'
    },
  },
  { withCredentials: true }
);

