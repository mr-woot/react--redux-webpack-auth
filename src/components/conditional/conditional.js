import React from "react";
import { connect } from "react-redux";
import ConditionalBuy from "./conditionalBuy";

@connect(store => {
  return { user: store.user };
})
class Conditional extends React.Component {
  render() {
    return (
      <div className="conditional-container">
        <ConditionalBuy />
      </div>
    );
  }
}

export default Conditional;
