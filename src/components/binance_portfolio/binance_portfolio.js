import React from "react";
import { connect } from "react-redux";
import { Tag } from "antd";
import BinanceOrders from "./binance_open_orders";
import { getCurrentBalances } from "../../_actions/order_actions";

@connect(store => {
    return { getCurrentBalances: store.getCurrentBalances };
})
class BinancePortfolio extends React.Component {
    componentDidMount() {
        this.fetchCurrentBalances();
    }

    fetchCurrentBalances = () => {
        this.props.dispatch(getCurrentBalances());
    }

    render() {
        return (
            <div className="binance-portfolio">
                <div className="user-balance" style={{ marginBottom: 18 }}>
                    <Tag color="#f50">BALANCE</Tag>: <b>{this.props.getCurrentBalances && this.props.getCurrentBalances.data && this.props.getCurrentBalances.data.available ? this.props.getCurrentBalances.data.available : "0.00000000"} BTC</b>
                </div>
                <BinanceOrders />
            </div>
        );
    }
}

export default BinancePortfolio;