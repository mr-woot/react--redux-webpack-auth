import React from "react";
import { Layout, Menu, Icon } from "antd";
import Price from "../price/price";
import Percentage from "../percentage/percentage";
import Conditional from "../conditional/conditional";
import Settings from "../settings/settings";
import Orders from "../orders/orders";
import BinancePortfolio from "../binance_portfolio/binance_portfolio";
import "./content.css";
const BINANCE_LOGO = require("../../assets/images/binance.png");
const { Header, Sider, Content } = Layout;

class MainContent extends React.Component {
  state = {
    collapsed: false,
    activeComponent: <Price />,
    activeKey: "price",
    loading: true
  };

  getActiveComponent = type => {
    switch (type) {
      case "price": {
        return <Price {...this.props} />;
        break;
      }
      case "percentage": {
        return <Percentage {...this.props} />;
        break;
      }
      case "conditional": {
        return <Conditional {...this.props} />;
        break;
      }
      case "orders": {
        return <Orders {...this.props} />
        break;
      }
      case "binance_portfolio": {
        return <BinancePortfolio {...this.props} />
        break;
      }
      default: {
        return <Settings {...this.props} />;
        break;
      }
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  setActiveComponent = ({ item, key, keyPath }) => {
    const activeComponent = this.getActiveComponent(key);
    this.setState({
      activeKey: key,
      activeComponent
    });
  };

  render() {
    const { activeComponent, activeKey } = this.state;
    return (
      <div className="content-wrap">
        <Layout style={{ background: "transaparent" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              background: "#fff",
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4
            }}
          >
            <div className="dash-logo" />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[activeKey]}
              onClick={this.setActiveComponent}
            >
              <Menu.Item key="price">
                <i class="fa fa-bitcoin" />
                <span>Price</span>
              </Menu.Item>
              <Menu.Item key="percentage">
                <i class="fa fa-percent" />
                <span>Percentage</span>
              </Menu.Item>
              <Menu.Item key="conditional">
                <i class="fa fa-balance-scale" />
                <span>Conditional</span>
              </Menu.Item>
              <Menu.Item key="orders">
                <i class="fa fa-opencart" />
                <span>Orders</span>
              </Menu.Item>
              <Menu.Item key="binance_portfolio">
                <i class="fa">
                  <img src={BINANCE_LOGO} style={{ width: 18 }} />
                </i>
                <span>Binance Portfolio</span>
              </Menu.Item>
              <Menu.Item key="settings">
                <i class="fa fa-cogs" />
                <span>Settings</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                color: "#262626",
                minHeight: 280
              }}
            >
              {activeComponent}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainContent;
