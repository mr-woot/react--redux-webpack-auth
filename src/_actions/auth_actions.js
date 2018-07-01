import axios from "axios";
import * as apiEndpoints from "../constants/apiEndpoints";
import { errorHandler } from "../_helpers/errorHandler";
import * as config from "./../constants/config";
import { latestPrice } from "./trade_actions";

export function setUser(userType) {
  return {
    type: `${userType}_USER`
  };
}

export function signup(payload, history) {
  return dispatch => {
    return dispatch({
      type: "SIGNUP",
      payload: axios.post(apiEndpoints.signup, payload)
    }).then(response => {
      history.push("/login");
    });
  };
}

export function login(payload, history) {
  return dispatch => {
    return dispatch({
      type: "LOGIN",
      payload: axios.post(apiEndpoints.login, payload)
    })
      .then(response => {
        const { token } = response.value.data.result;
        const {
          id,
          username,
          email,
          fullName,
          phoneNumber,
          country,
          address,
          apiKey,
          secretKey
        } = response.value.data.result;
        localStorage.setItem("token", token);
        dispatch(setUser("AUTH"));
        dispatch(latestPrice(false));
        history.push("/");
      })
      .catch(err => {
        const { message } = err.response.data.error;
        errorHandler(dispatch, message, "LOGIN");
      });
  };
}

export function setUserData(payload) {
  return {
    type: "SET_USER_DATA",
    payload
  };
}

export function user(history) {
  return dispatch => {
    return dispatch({
      type: "SET_USER_DATA",
      payload: axios.get(apiEndpoints.user, {
        headers: {
          Authorization: localStorage.getItem("token") || null
        }
      })
    })
      .then(response => {})
      .catch(err => {
        // errorHandler(dispatch, err.message, "LOGIN");
        localStorage.removeItem("token");
        dispatch(setUser("UNAUTH"));
        history.push("login");
      });
  };
}

export function updateSettings(history, payload) {
  return dispatch => {
    return dispatch({
      type: "UPDATE_SETTINGS",
      payload: axios.post(apiEndpoints.settings, payload, {
        headers: {
          Authorization: localStorage.getItem("token") || null
        }
      })
    })
      .then(response => {
        return dispatch(user(history));
      })
      .catch(err => {
        // errorHandler(dispatch, err.message, "LOGIN");
      });
  };
}

export function logout(history) {
  return dispatch => {
    // let state = store.getState();
    localStorage.removeItem("token");
    dispatch(setUser("UNAUTH"));
    history.push("login");
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
