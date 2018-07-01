import React from "react";
import { connect } from "react-redux";
import PriceBuy from "./priceBuy";

@connect(store => {
  return { user: store.user };
})
class Price extends React.Component {
  render() {
    return (
      <div className="price-container">
        <PriceBuy />
      </div>
    );
  }
}

export default Price;
