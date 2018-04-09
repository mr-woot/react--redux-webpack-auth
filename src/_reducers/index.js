import { combineReducers } from "redux";
import { login, user } from "./auth_reducer";

const appReducer = combineReducers({
  login,
  user
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;
