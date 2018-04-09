import axios from "axios";
import * as apiEndpoints from "../constants/apiEndpoints";
import { errorHandler } from "../_helpers/errorHandler";
import * as config from "./../constants/config";

export function setUser(userType) {
  return {
    type: "SET_USER",
    payload: userType
  };
}

export function login(payload, history) {
  console.log(apiEndpoints.login);
  return dispatch => {
    return dispatch({
      type: "LOGIN",
      payload: axios.post(apiEndpoints.login, payload)
    })
      .then(response => {
        const { token } = response.value.data.result.body.result;
        debugger;
        localStorage.setItem("token", token);
        window.location.href = "/";
        // history.push("/");
      })
      .catch(err => {
        errorHandler(dispatch, err.response.data.error.message, "LOGIN");
      });
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("token");
    dispatch(setUser("UNAUTH_USER"));
    window.location.href = "/login";
  };
}

function loggedIn() {
  // Checks if there is a saved token and it's still valid
  const token = this.getToken(); // GEtting token from localstorage
  return !!token && !this.isTokenExpired(token); // handwaiving here
}

function isTokenExpired(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired. N
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}

function setToken(idToken) {
  // Saves user token to localStorage
  localStorage.setItem("token", idToken);
}

function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem("token");
}

function getProfile() {
  // Using jwt-decode npm package to decode the token
  return decode(this.getToken());
}
