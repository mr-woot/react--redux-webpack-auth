import React from "react";
import { connect } from "react-redux";
import { Table, Tag } from "antd";
import { getOrders } from "../../_actions/order_actions";

@connect(store => {
  return { orders: store.getOrders.orders, count: store.getOrders.count };
})
class Orders extends React.Component {
  state = {
    pageNumber: 0,
    limit: 5
  }
  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = () => {
    const { pageNumber, limit } = this.state;
    this
      .props
      .dispatch(getOrders({ pageNumber, limit }));
  }

  onChange = pageNumber => {
    this.setState({ pageNumber: pageNumber - 1 }, () => {
      this.fetchOrders();
    })
  }

  render() {
    const dataSource = this.props.orders || [];
    const columns = [
      {
        title: 'Order ID',
        dataIndex: 'orderId',
        key: 'orderId'
      }, {
        title: 'Order Type',
        dataIndex: 'orderType',
        key: 'orderType'
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
        dataIndex: 'quantity',
        key: 'quantity'
      },
      // {
      //   title: 'Action',
      //   key: 'cancelOrder',
      //   render: (text, record) => {
      //     const { status, orderType } = record;
      //     if (orderType === "BOT" || status !== "PENDING") {
      //       return <div key={record.id}>N/A</div>
      //     } else {
      //       return <Tag color="#f50" onClick={this.handleCancelOrder(record)}>Cancel Order</Tag>
      //     }
      //   }
      // }
    ];
    return (
      <div className="orders-table">
        <Table
          bordered={true}
          rowKey={record => record.id}
          dataSource={dataSource}
          columns={columns}
          pagination={{ total: this.props.count, defaultPageSize: this.state.limit, onChange: this.onChange, defaultCurrent: 1 }}
        />
      </div>
    );
  }
}

export default Orders;
