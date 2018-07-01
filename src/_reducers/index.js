import { combineReducers } from "redux";
import { login, signup, user, updateSettings } from "./auth_reducer";
import {
  priceTrade,
  percentageTrade,
  conditionalTrade,
  latestPrice
} from "./trade_reducer";
import { getOrders, getBinanceOrders, cancelBinanceOrderById, getCurrentBalances } from "./orders_reducer";

const appReducer = combineReducers({
  login,
  signup,
  user,
  priceTrade,
  percentageTrade,
  conditionalTrade,
  latestPrice,
  updateSettings,
  getOrders,
  getBinanceOrders,
  cancelBinanceOrderById,
  getCurrentBalances
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;
