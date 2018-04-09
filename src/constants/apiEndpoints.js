import * as config from "./config";
const baseApi = config.BASE_API;

/**
 * AUTH ROUTES
 */
export const login = `${baseApi}/login`;
export const register = `${baseApi}/register`;
export const logout = `${baseApi}/logout`;
export const getToken = `${baseApi}/getToken`;
