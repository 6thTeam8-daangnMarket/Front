// Action 과 Reducer 사용을 편하게 하기 위한 패키지
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //immer : 불변성 관리
import moment from "moment"; // Date객체와 유사
import { api } from "../../shared/api";
import axios from "axios"; //axios: node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트 

//Actions
const ADD_CART = "ADD_CART";
const DELETE_CART = "DELETE_CART";

//ActionCreators 
const add_cart = createAction(ADD_CART, (goods) => ({goods}));
const delete_cart = createAction(DELETE_CART, () => ({}));
//initialState
const initialState = {
    
}

//middleWare



//Reducer


