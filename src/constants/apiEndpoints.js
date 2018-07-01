import * as config from "./config";
const baseApi = config.BASE_API;

/**
 * AUTH ROUTES
 */
export const login = `${baseApi}/user/login`;
export const user = `${baseApi}/user`;
export const signup = `${baseApi}/user/register`;
export const logout = `${baseApi}/user/logout`;
export const getToken = `${baseApi}/user/getToken`;
export const settings = `${baseApi}/user/settings`;

/**
 * TRADE-BY-PRICE ROUTES
 */
export const priceTrade = `${baseApi}/trade/priceTrade`;
export const percentageTrade = `${baseApi}/trade/percentageTrade`;
export const conditionalTrade = `${baseApi}/trade/conditionalTrade`;
export const getOrders = `${baseApi}/trade/getOrders`;

/**
 * EXCHANGE INFO ROUTES
 */
export const latestPrice = `${baseApi}/binance/latestPrice`;

/**
 * USER SPECIFIC ROUTES
 */
export const getBinanceOrders = `${baseApi}/binance/openOrders`;
export const cancelBinanceOrderById = `${baseApi}/binance/cancelOrderById`;
export const getCurrentBalances = `${baseApi}/binance/currentBalances`;
