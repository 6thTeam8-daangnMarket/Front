import axios from "axios";

export const api = axios.create(
  {
    baseURL: "http://3.36.77.41",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      accept: "application/json,",
    },
  },
  { withCredentials: true }
);
