import React from "react";
import { connect } from "react-redux";
import { Slider, InputNumber, Row, Col } from "antd";

@connect(store => {
  return {
    user: store.user
  };
})
class PercentageSlider extends React.Component {
  render() {
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={0}
            max={100}
            onChange={this.props.onChangeSlider}
            value={this.props.sliderValue}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={100}
            style={{ marginLeft: 16 }}
            step={0.01}
            value={this.props.sliderValue}
            onChange={this.props.onChangeSlider}
          />
        </Col>
      </Row>
    );
  }
}
export default PercentageSlider;
