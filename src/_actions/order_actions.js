import axios from "axios";
import * as apiEndpoints from "../constants/apiEndpoints";

export function getOrders(queryParams) {
    return dispatch => {
        return dispatch({
            type: "GET_ORDERS",
            payload: axios.get(apiEndpoints.getOrders, {
                params: queryParams,
                headers: {
                    Authorization: localStorage.getItem("token") || null
                }
            })
        });
    };
}

export function getBinanceOrders(queryParams) {
    return dispatch => {
        return dispatch({
            type: "GET_BINANCE_ORDERS",
            payload: axios.get(apiEndpoints.getBinanceOrders, {
                params: queryParams,
                headers: {
                    Authorization: localStorage.getItem("token") || null
                }
            })
        });
    };
}

export function cancelBinanceOrderById(bodyParams) {
    return dispatch => {
        return dispatch({
            type: "CANCEL_BINANCE_ORDER_BY_ID",
            payload: axios.post(apiEndpoints.cancelBinanceOrderById, bodyParams, {
                headers: {
                    Authorization: localStorage.getItem("token") || null
                }
            })
        });
    };
}

export function getCurrentBalances() {
    return dispatch => {
        return dispatch({
            type: "GET_CURRENT_BALANCES",
            payload: axios.get(apiEndpoints.getCurrentBalances, {
                headers: {
                    Authorization: localStorage.getItem("token") || null
                }
            })
        });
    };
}