import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NotFoundPage from "./containers/pages/not_found";
import Home from "./containers/home/home";
import Login from "./containers/auth/login";
import { setUser } from "./_actions/auth_actions";
import publicRoute from "./components/hoc/require_no_auth";
import privateRoute from "./components/hoc/require_auth";

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
      this.props.dispatch(setUser("UNAUTH"));
    } else {
      this.props.dispatch(setUser("AUTH"));
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={privateRoute(Home)} />
        <Route exact path="/login" component={publicRoute(Login)} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}
