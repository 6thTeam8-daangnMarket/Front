import axios from "axios";

export const api = axios.create(
  {    
    baseURL: "http://3.38.117.7",
    'content-type': 'application/json;charset=UTF-8',
  },
  { withCredentials: true }
);
