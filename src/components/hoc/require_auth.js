import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function(ComposedComponent) {
  @connect(store => {
    return {
      isAuthenticated: store.user.isAuthenticated
    };
  })
  class PrivateRoute extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/login");
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
