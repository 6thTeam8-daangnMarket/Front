import axios from "axios";

export const api = axios.create(
  {
    // baseURL: "http://52.79.233.178", // 민성님 주소
    baseURL: "http://3.38.117.7", // 승재님 주소
    // baseURL: "http://3.36.77.41", // 예령님 주소
    "content-type": "application/json;charset=UTF-8",
  },
  { withCredentials: true }
);
