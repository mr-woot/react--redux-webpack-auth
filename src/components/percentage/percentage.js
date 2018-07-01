import React from "react";
import { connect } from "react-redux";
import PercentageBuy from "./percentageBuy";

@connect(store => {
  return { user: store.user };
})
class Percentage extends React.Component {
  render() {
    return (
      <div className="percentage-container">
        <PercentageBuy />
      </div>
    );
  }
}

export default Percentage;
