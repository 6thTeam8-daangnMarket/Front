import axios from "axios";

export const api = axios.create({
  baseURL: "192.168.0.7:8080",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});
