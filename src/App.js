import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NotFoundPage from "./containers/pages/not_found";
import Home from "./containers/home/home";
import Login from "./containers/auth/login";

@withRouter
@connect(store => {
  return {
    user: store.user
  };
})
export default class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({
        isLoggedIn: false
      });
    } else {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => {
            return this.state.isLoggedIn ? (
              <Home {...routeProps} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route
          exact
          path="/login"
          render={routeProps => {
            return this.state.isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login {...routeProps} />
            );
          }}
        />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}
