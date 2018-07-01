import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NotFoundPage from "./containers/pages/not_found";
import Home from "./containers/home/home";
import Price from "./components/price/price";
import Login from "./containers/auth/login";
import Signup from "./containers/auth/signup";
import { setUser, user } from "./_actions/auth_actions";
import publicRoute from "./components/hoc/require_no_auth";
import privateRoute from "./components/hoc/require_auth";
import { latestPrice } from "./_actions/trade_actions";

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
      this.props.dispatch(user(this.props.history));
      this.props.dispatch(latestPrice(false));
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={privateRoute(Home)} />
        <Route
          path="/:type(price|percentage|conditional|settings)"
          component={privateRoute(Home)}
        />
        <Route exact path="/login" component={publicRoute(Login)} />
        <Route exact path="/signup" component={publicRoute(Signup)} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}
