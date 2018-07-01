import axios from "axios";
import * as apiEndpoints from "../constants/apiEndpoints";

export function priceTrade(history, payload) {
  return dispatch => {
    return dispatch({
      type: "PRICE_TRADE",
      payload: axios.post(apiEndpoints.priceTrade, payload, {
        headers: {
          Authorization: localStorage.getItem("token") || null
        }
      })
    });
  };
}

export function percentageTrade(history, payload) {
  return dispatch => {
    return dispatch({
      type: "PERCENTAGE_TRADE",
      payload: axios.post(apiEndpoints.percentageTrade, payload, {
        headers: {
          Authorization: localStorage.getItem("token") || null
        }
      })
    });
  };
}

export function conditionalTrade(history, payload) {
  return dispatch => {
    return dispatch({
      type: "CONDITIONAL_TRADE",
      payload: axios.post(apiEndpoints.conditionalTrade, payload, {
        headers: {
          Authorization: localStorage.getItem("token") || null
        }
      })
    });
  };
}

export function latestPrice(history, symbol = false) {
  return dispatch => {
    return dispatch({
      type: "LATEST_PRICE",
      payload: axios.get(apiEndpoints.latestPrice, {
        params: { symbol },
        headers: {
          Authorization: localStorage.getItem("token") || null
        }
      })
    });
  };
}
