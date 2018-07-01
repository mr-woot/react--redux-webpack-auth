import React from "react";
import { connect } from "react-redux";
import Decimal from "decimal.js";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Button,
  Radio,
  Select
} from "antd";
import { conditionalTrade } from "../../_actions/trade_actions";
import { notify } from "../../_helpers/notify";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@connect(store => {
  return { latestPrice: store.latestPrice };
})
class PriceForm extends React.Component {
  state = {
    confirmDirty: false,
    disabled: false,
    autoCompleteData: this.props.latestPrice.tradeInfo["BTC"],
    pair: "BTC"
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ disabled: true });
        const { symbol, pair, price, stopPrice, quantity, type } = values;
        const payload = {
          symbol,
          pair,
          price,
          stopPrice,
          quantity,
          type,
          stopOrderType: "STOP_LOSS_LIMIT"
        };
        this.props
          .dispatch(conditionalTrade(this.props.history, payload))
          .then(response => {
            notify("Trade placed successfully", "success");
            this.setState({ disabled: false });
          })
          .catch(err => {
            this.setState({ disabled: false });
            const { message } = err.response.data.error;
            notify(message, "error");
          });
      }
    });
  };
  handleOnSelect = (value, option) => {
    this.setState(
      {
        autoCompleteData: this.props.latestPrice.tradeInfo[value],
        pair: value
      },
      () => {
        console.log(this.state);
      }
    );
  };
  validateQuantity = (rule, value, callback) => {
    const { form, latestPrice } = this.props;
    let newValue = new Decimal(value || 0);
    const currentValue = newValue.times(
      latestPrice.latestPrice[
      `${form.getFieldValue("symbol")}${this.state.pair}`
      ] || 0
    );
    if (value && currentValue.lessThan(0.001)) {
      callback(
        `Quanity should be greater than equal to 0.001 ${this.state.pair}!`
      );
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { disabled } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 6 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        },
        md: {
          span: 4,
          offset: 8
        }
      }
    };

    const sufffixSelector = getFieldDecorator("pair", {
      initialValue: "BTC"
    })(
      <Select onSelect={this.handleOnSelect}>
        <Option value="BTC">BTC</Option>
        <Option value="ETH">ETH</Option>
        <Option value="BNB">BNB</Option>
        <Option value="USDT">USDT</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Currency&nbsp;
              <Tooltip title="Currency Symbol used to trade. It may differs platformwise.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("symbol", {
            rules: [
              {
                required: true,
                message: "Please input your currency!"
              }
            ]
          })(<Input addonAfter={sufffixSelector} disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              When the price reaches&nbsp;
              <Tooltip title="Stop Price">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("stopPrice", {
            rules: [
              {
                required: true,
                message: "Please input your stop price!"
              }
            ]
          })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Place order at this price&nbsp;
              <Tooltip title="Price at which you want to place order.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("price", {
            rules: [
              {
                required: true,
                message: "Please input your price!"
              }
            ]
          })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Quantity&nbsp;
              <Tooltip title="Quantity of order.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("quantity", {
            rules: [
              {
                required: true,
                message: "Please input your quantity!"
              },
              {
                validator: this.validateQuantity
              }
            ]
          })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Type">
          {getFieldDecorator("type", {
            rules: [
              {
                required: true,
                message: "Please select order type"
              }
            ]
          })(
            <RadioGroup>
              <Radio value="buy">Buy</Radio>
              <Radio value="sell">Sell</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedPriceForm = Form.create()(PriceForm);

export default WrappedPriceForm;
