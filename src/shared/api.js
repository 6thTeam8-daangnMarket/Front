import axios from "axios";

export const api = axios.create(
  {
    baseURL: "http://192.168.0.7:8085",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      accept: "application/json,",
    },
  },
  { withCredentials: true }
);
