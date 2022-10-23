import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import usuario from "./usuario";

export default combineReducers({
  auth,
  message,
  usuario
});