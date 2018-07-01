import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function(ComposedComponent) {
  @connect(store => {
    return {
      isAuthenticated: store.user.isAuthenticated
    };
  })
  class PublicRoute extends Component {
    componentDidMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push("/");
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return PublicRoute;
}
