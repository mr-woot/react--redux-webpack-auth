import { combineReducers } from "redux";
import { login, user, getToken } from "./auth_reducer";

const appReducer = combineReducers({
  login,
  user,
  getToken
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;
