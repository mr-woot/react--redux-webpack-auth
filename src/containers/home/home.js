import React from "react";
import { connect } from "react-redux";
import Loader from "../../components/common/loader/loader";
import Header from "../../components/header/header";
import Content from "../../components/content/content";
import { latestPrice } from "../../_actions/trade_actions";

import "./home.css";

@connect(store => {
  return {
    latestPrice: store.latestPrice
  };
})
class Home extends React.Component {
  state = {
    loading: true
  };
  render() {
    return (
      <div className="home">
        <div className="home-wrap">
          <Header key="header" {...this.props} />
          {this.props.latestPrice.processing ? (
            <Loader />
          ) : (
            <Content key="content" {...this.props} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
