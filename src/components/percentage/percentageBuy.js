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
  Select,
  Radio,
  Slider,
  InputNumber
} from "antd";
import PercentageSlider from "../common/slider/percentage_slider";
import { percentageTrade } from "../../_actions/trade_actions";
import { notify } from "../../_helpers/notify";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@connect(store => {
  return { latestPrice: store.latestPrice };
})
class PercentageForm extends React.Component {
  state = {
    disabled: false,
    sliderValue: 0,
    autoCompleteData: this.props.latestPrice.tradeInfo["BTC"],
    pair: "BTC"
  };
  onChangeSlider = value => {
    this.setState({
      sliderValue: value
    }, () => {
      console.log(this.state.sliderValue)
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ disabled: true });
        const { symbol, pair, percentage, quantity } = values;
        const payload = {
          symbol,
          pair,
          percentage: this.state.sliderValue,
          quantity
        };
        this.props
          .dispatch(percentageTrade(this.props.history, payload))
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
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Percentage&nbsp;
              <Tooltip title="Percentage at which you want to place order.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("percentage", {
            rules: [
              {
                required: true,
                message: "Please input your percentage!"
              }
            ],
            initialValue: this.state.sliderValue
          })(
            <Row>
              <Col span={24}>
                <Slider
                  min={0}
                  max={100}
                  onChange={this.onChangeSlider}
                  value={this.state.sliderValue}
                  step={1}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ marginLeft: 16 }}
                  onChange={this.onChangeSlider}
                  value={this.state.sliderValue}
                  step={1}
                />
              </Col>
            </Row>
          )}
        </FormItem>
        <FormItem {...formItemLayout}
        label={<span style={{fonstSize: "bold"}}>Note</span>}>
          Some assets may not adhere with the binance sell limit.
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

const WrappedPercentageForm = Form.create()(PercentageForm);

export default WrappedPercentageForm;
