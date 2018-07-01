import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setUser } from "../../_actions/auth_actions";

export default function(ComposedComponent) {
  @connect(store => {
    return {
      isAuthenticated: store.user.isAuthenticated
    };
  })
  class PrivateRoute extends Component {
    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/login");
      } else {
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return PrivateRoute;
}
