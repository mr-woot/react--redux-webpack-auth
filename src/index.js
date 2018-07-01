import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

import store from "./_helpers/store";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import "./index.css";
import "./themes/ant-overrides.css";

import axios from "axios";
axios.withCredentials = true;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LocaleProvider locale={enUS}>
        <App />
      </LocaleProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
