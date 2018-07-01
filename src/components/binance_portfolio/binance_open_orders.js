import React from "react";
import { connect } from "react-redux";
import { Table, Tag } from "antd";
import { getBinanceOrders, cancelBinanceOrderById } from "../../_actions/order_actions";

@connect(store => {
    return { getBinanceOrders: store.getBinanceOrders, count: store.getBinanceOrders.count };
})
class BinanceOrders extends React.Component {
    state = {
        pageNumber: 0,
        limit: 5
    }
    componentDidMount() {
        this.fetchBinanceOrders();
    }

    fetchBinanceOrders = () => {
        const { pageNumber, limit } = this.state;
        this
            .props
            .dispatch(getBinanceOrders());
    }

    onChange = pageNumber => {
        this.setState({ pageNumber: pageNumber - 1 }, () => {
            this.fetchBinanceOrders();
        })
    }

    handleCancelOrder = (record) => {
        const { orderId, symbol } = record;
        this.props.dispatch(cancelBinanceOrderById({ symbol, orderId })).then(result => {
            this.fetchBinanceOrders();
        })
    }

    render() {
        const dataSource = this.props.getBinanceOrders && this.props.getBinanceOrders.orders || [];
        const columns = [
            {
                title: 'Order ID',
                dataIndex: 'orderId',
                key: 'orderId'
            }, {
                title: 'Order Type',
                dataIndex: 'type',
                key: 'type'
            }, {
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            }, {
                title: 'Side',
                dataIndex: 'side',
                key: 'side'
            }, {
                title: 'Symbol (Currency)',
                dataIndex: 'symbol',
                key: 'symbol'
            }, {
                title: 'Price',
                dataIndex: 'price',
                key: 'price'
            }, {
                title: 'Quantity',
                dataIndex: 'origQty',
                key: 'origQty'
            },
            {
                title: 'Action',
                key: 'cancelOrder',
                render: (text, record) => {
                    return <Tag color="#f50" onClick={() => this.handleCancelOrder(record)}>Cancel Order</Tag>
                }
            }
        ];
        return (
            <div className="binance-open-orders-table">
                <Table
                    title={() => <b>OPEN ORDERS</b>}
                    loading={this.props.getBinanceOrders.processing}
                    bordered={true}
                    rowKey={record => record.time}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                // pagination={{ total: this.props.count, defaultPageSize: this.state.limit, onChange: this.onChange, defaultCurrent: 1 }}
                />
            </div>
        );
    }
}

export default BinanceOrders;
